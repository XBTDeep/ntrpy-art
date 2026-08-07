// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Test} from "forge-std/Test.sol";
import {NTRPY} from "../src/NTRPY.sol";
import {IRenderer} from "../src/IRenderer.sol";
import {IERC721A} from "erc721a/contracts/IERC721A.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MockRenderer is IRenderer {
    function render(uint256 tokenId) external pure returns (string memory) {
        return string(abi.encodePacked("rendered:", _str(tokenId)));
    }

    function _str(uint256 v) internal pure returns (string memory) {
        if (v == 0) return "0";
        uint256 d;
        for (uint256 t = v; t != 0; t /= 10) d++;
        bytes memory b = new bytes(d);
        while (v != 0) {
            b[--d] = bytes1(uint8(48 + (v % 10)));
            v /= 10;
        }
        return string(b);
    }
}

contract NTRPYTest is Test {
    NTRPY nft;

    address owner = address(0xA11CE);
    address alice = address(0xA1);
    address bob = address(0xB0B);
    address treasury = address(0x7EA);

    string constant URI = "ar://EYE_METADATA_TX_ID";

    uint64 opens;
    uint64 closes;

    function setUp() public {
        vm.warp(1_800_000_000);
        opens = uint64(block.timestamp);
        closes = uint64(block.timestamp + 7 days);

        vm.prank(owner);
        nft = new NTRPY(URI, treasury, 500); // 5% royalty

        vm.prank(owner);
        nft.setMintWindow(opens, closes);
    }

    /* ─────────────────────────── basics ─────────────────────────── */

    function test_NameSymbolAndStartId() public view {
        assertEq(nft.name(), "NTRPY");
        assertEq(nft.symbol(), "NTRPY");
        assertEq(nft.totalSupply(), 0);
    }

    function test_FirstTokenIdIsOne() public {
        vm.prank(alice);
        nft.mint(1);
        assertEq(nft.ownerOf(1), alice);
        vm.expectRevert(IERC721A.OwnerQueryForNonexistentToken.selector);
        nft.ownerOf(0);
    }

    /* ──────────────────────────── mint ──────────────────────────── */

    function test_MintSingle() public {
        vm.prank(alice);
        nft.mint(1);
        assertEq(nft.balanceOf(alice), 1);
        assertEq(nft.totalSupply(), 1);
    }

    function test_MintBatchUpToWalletCap() public {
        vm.prank(alice);
        nft.mint(10);
        assertEq(nft.balanceOf(alice), 10);
        assertEq(nft.ownerOf(1), alice);
        assertEq(nft.ownerOf(10), alice);
    }

    function test_RevertWhen_ExceedingWalletCapInOneTx() public {
        vm.prank(alice);
        vm.expectRevert(NTRPY.WalletLimitExceeded.selector);
        nft.mint(11);
    }

    function test_RevertWhen_ExceedingWalletCapAcrossTxs() public {
        vm.startPrank(alice);
        nft.mint(6);
        nft.mint(4);
        vm.expectRevert(NTRPY.WalletLimitExceeded.selector);
        nft.mint(1);
        vm.stopPrank();
    }

    function test_RevertWhen_ZeroQuantity() public {
        vm.prank(alice);
        vm.expectRevert(NTRPY.ZeroQuantity.selector);
        nft.mint(0);
    }

    /// @dev The cap must survive burning — otherwise a wallet mint-burn-repeats
    ///      its way past 10 and drains the supply.
    function test_BurningDoesNotRefreshWalletAllowance() public {
        vm.startPrank(alice);
        nft.mint(10);
        nft.burn(1);
        nft.burn(2);
        assertEq(nft.balanceOf(alice), 8);
        vm.expectRevert(NTRPY.WalletLimitExceeded.selector);
        nft.mint(1);
        vm.stopPrank();
    }

    /* ─────────────────────────── window ─────────────────────────── */

    function test_RevertWhen_MintBeforeOpen() public {
        vm.prank(owner);
        nft.setMintWindow(uint64(block.timestamp + 1 days), uint64(block.timestamp + 2 days));
        vm.prank(alice);
        vm.expectRevert(NTRPY.MintClosed.selector);
        nft.mint(1);
    }

    function test_RevertWhen_MintAfterClose() public {
        vm.warp(closes);
        vm.prank(alice);
        vm.expectRevert(NTRPY.MintClosed.selector);
        nft.mint(1);
    }

    function test_OwnerCanCloseEarly() public {
        vm.prank(owner);
        nft.closeMint();
        vm.prank(alice);
        vm.expectRevert(NTRPY.MintClosed.selector);
        nft.mint(1);
    }

    function test_RevertWhen_WindowInverted() public {
        vm.prank(owner);
        vm.expectRevert(NTRPY.WindowInverted.selector);
        nft.setMintWindow(closes, opens);
    }

    function test_MintIsOpenView() public {
        assertTrue(nft.mintIsOpen());
        vm.warp(closes);
        assertFalse(nft.mintIsOpen());
    }

    /* ────────────────────────── supply cap ──────────────────────── */

    function test_RevertWhen_ExceedingMaxSupply() public {
        // 333 wallets x 10 = 3330, then one wallet takes the last 3.
        for (uint256 i = 0; i < 333; i++) {
            address w = address(uint160(0x1000 + i));
            vm.prank(w);
            nft.mint(10);
        }
        assertEq(nft.totalSupply(), 3330);

        address last = address(uint160(0x9999));
        vm.prank(last);
        nft.mint(3);
        assertEq(nft.totalSupply(), 3333);

        address late = address(uint160(0xDEAD));
        vm.prank(late);
        vm.expectRevert(NTRPY.SoldOut.selector);
        nft.mint(1);
    }

    /// @dev Burned tokens must not reopen supply — _totalMinted is the cap basis.
    function test_BurningDoesNotReopenSupply() public {
        for (uint256 i = 0; i < 333; i++) {
            vm.prank(address(uint160(0x1000 + i)));
            nft.mint(10);
        }
        vm.prank(address(uint160(0x9999)));
        nft.mint(3);

        vm.prank(address(uint160(0x1000)));
        nft.burn(1);
        assertEq(nft.totalSupply(), 3332);

        vm.prank(address(uint160(0xBEEF)));
        vm.expectRevert(NTRPY.SoldOut.selector);
        nft.mint(1);
    }

    /* ───────────────────────── heldSince ────────────────────────── */

    function test_HeldSinceIsSetAtMint() public {
        vm.prank(alice);
        nft.mint(3);
        assertEq(nft.heldSince(1), block.timestamp);
        assertEq(nft.heldSince(3), block.timestamp);
    }

    function test_HeldSinceResetsOnTransfer() public {
        vm.prank(alice);
        nft.mint(1);
        uint256 mintedAt = nft.heldSince(1);

        vm.warp(block.timestamp + 30 days);
        vm.prank(alice);
        nft.transferFrom(alice, bob, 1);

        assertEq(nft.heldSince(1), block.timestamp);
        assertGt(nft.heldSince(1), mintedAt);
        assertEq(nft.heldFor(1), 0);
    }

    function test_HeldForAccumulates() public {
        vm.prank(alice);
        nft.mint(1);
        vm.warp(block.timestamp + 13 weeks);
        assertEq(nft.heldFor(1), 13 weeks);
    }

    /// @dev A batch mint must give every token in it the same start stamp,
    ///      not just the batch head.
    function test_HeldSinceCorrectAcrossBatchAfterPartialTransfer() public {
        vm.prank(alice);
        nft.mint(5);
        uint256 t0 = block.timestamp;

        vm.warp(t0 + 10 days);
        vm.prank(alice);
        nft.transferFrom(alice, bob, 3);

        assertEq(nft.heldSince(2), t0, "untouched token kept its stamp");
        assertEq(nft.heldSince(4), t0, "token after the gap kept its stamp");
        assertEq(nft.heldSince(3), t0 + 10 days, "transferred token reset");
    }

    function test_RevertWhen_HeldSinceOnNonexistent() public {
        vm.expectRevert(NTRPY.NonexistentToken.selector);
        nft.heldSince(1);
    }

    /* ────────────────────────── metadata ────────────────────────── */

    function test_EveryTokenReturnsSameURI() public {
        vm.prank(alice);
        nft.mint(3);
        assertEq(nft.tokenURI(1), URI);
        assertEq(nft.tokenURI(2), URI);
        assertEq(nft.tokenURI(3), URI);
    }

    function test_RevertWhen_TokenURIOnNonexistent() public {
        vm.expectRevert(NTRPY.NonexistentToken.selector);
        nft.tokenURI(1);
    }

    function test_OwnerCanSwapURI() public {
        vm.prank(alice);
        nft.mint(1);
        vm.prank(owner);
        nft.setURI("ar://CHARACTER_ART");
        assertEq(nft.tokenURI(1), "ar://CHARACTER_ART");
    }

    function test_RendererSupersedesURIAndCanBeUnset() public {
        vm.prank(alice);
        nft.mint(2);

        MockRenderer r = new MockRenderer();
        vm.prank(owner);
        nft.setRenderer(address(r));

        assertEq(nft.tokenURI(1), "rendered:1");
        assertEq(nft.tokenURI(2), "rendered:2");

        vm.prank(owner);
        nft.setRenderer(address(0));
        assertEq(nft.tokenURI(1), URI);
    }

    /* ────────────────────────── royalties ───────────────────────── */

    function test_RoyaltyInfo() public {
        vm.prank(alice);
        nft.mint(1);
        (address receiver, uint256 amount) = nft.royaltyInfo(1, 1 ether);
        assertEq(receiver, treasury);
        assertEq(amount, 0.05 ether); // 5%
    }

    function test_OwnerCanRepointRoyaltyToVault() public {
        address vault = address(0xFEEDFACE);
        vm.prank(owner);
        nft.setDefaultRoyalty(vault, 1000);
        (address receiver, uint256 amount) = nft.royaltyInfo(1, 1 ether);
        assertEq(receiver, vault);
        assertEq(amount, 0.1 ether);
    }

    function test_SupportsInterfaces() public view {
        assertTrue(nft.supportsInterface(0x80ac58cd), "ERC721");
        assertTrue(nft.supportsInterface(0x5b5e139f), "ERC721Metadata");
        assertTrue(nft.supportsInterface(0x2a55205a), "ERC2981");
        assertTrue(nft.supportsInterface(0x01ffc9a7), "ERC165");
    }

    /* ──────────────────────────── access ────────────────────────── */

    function test_RevertWhen_NonOwnerCallsAdmin() public {
        vm.startPrank(alice);

        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, alice));
        nft.setMintWindow(opens, closes);

        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, alice));
        nft.setURI("x");

        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, alice));
        nft.setRenderer(address(1));

        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, alice));
        nft.closeMint();

        vm.stopPrank();
    }

    /* ──────────────────────────── fuzz ──────────────────────────── */

    function testFuzz_MintWithinCapAlwaysSucceeds(uint8 qty) public {
        qty = uint8(bound(qty, 1, 10));
        vm.prank(alice);
        nft.mint(qty);
        assertEq(nft.balanceOf(alice), qty);
        assertEq(nft.numberMinted(alice), qty);
    }

    function testFuzz_HeldSinceNeverExceedsNow(uint8 qty, uint32 skip) public {
        qty = uint8(bound(qty, 1, 10));
        vm.prank(alice);
        nft.mint(qty);
        vm.warp(block.timestamp + skip);
        for (uint256 i = 1; i <= qty; i++) {
            assertLe(nft.heldSince(i), block.timestamp);
        }
    }
}

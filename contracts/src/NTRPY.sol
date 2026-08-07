// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ERC721A} from "erc721a/contracts/ERC721A.sol";
import {IERC721A} from "erc721a/contracts/IERC721A.sol";
import {ERC721ABurnable} from "erc721a/contracts/extensions/ERC721ABurnable.sol";
import {ERC2981} from "@openzeppelin/contracts/token/common/ERC2981.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import {IRenderer} from "./IRenderer.sol";

/**
 *                            N T R P Y
 *                      C H A P T E R   I
 *
 *  3,333 identical eyes. No rarity is rolled at mint — every specimen is
 *  the same, because Chapter I is LARVA: you arrive as what your
 *  environment made you.
 *
 *  What distinguishes one specimen from another is only ever what its
 *  holder does with it. Rarity is earned, not drawn.
 *
 *  Deliberately minimal. The only things here are things that cannot be
 *  added later:
 *    - burnable          every future burn mechanic
 *    - ERC-2981          the royalty vault
 *    - swappable renderer  the character art, chapters, dynamic state
 *    - startTimestamp    time-held accrual  (free, from ERC721A)
 *
 *  Everything else — vaults, staking, chapters, an Anvil market — is a
 *  separate contract that reads this one. Nothing here needs to change.
 *
 *  "You go blind right before you see clearly."
 */
contract NTRPY is ERC721A, ERC721ABurnable, ERC2981, Ownable {
    /* ─────────────────────────── constants ─────────────────────────── */

    uint256 public constant MAX_SUPPLY = 3333;
    uint256 public constant MAX_PER_WALLET = 10;

    /* ──────────────────────────── storage ──────────────────────────── */

    /// @notice Mint window bounds (unix seconds). Zero-zero means closed.
    uint64 public mintOpens;
    uint64 public mintCloses;

    /// @notice Metadata for every token while `renderer` is unset.
    string private _uri;

    /// @notice When set, supersedes `_uri` and renders per-token.
    address public renderer;

    /* ───────────────────────────── errors ──────────────────────────── */

    error MintClosed();
    error ZeroQuantity();
    error WalletLimitExceeded();
    error SoldOut();
    error NonexistentToken();
    error WindowInverted();

    /* ───────────────────────────── events ──────────────────────────── */

    event MintWindowSet(uint64 opens, uint64 closes);
    event URISet(string uri);
    event RendererSet(address renderer);

    /* ─────────────────────────── construction ──────────────────────── */

    constructor(
        string memory uri_,
        address royaltyReceiver,
        uint96 royaltyFeeNumerator
    ) ERC721A("NTRPY", "NTRPY") Ownable(msg.sender) {
        _uri = uri_;
        _setDefaultRoyalty(royaltyReceiver, royaltyFeeNumerator);
    }

    /// @dev Token IDs start at 1. ID 0 reads as "unset" everywhere else.
    function _startTokenId() internal pure override returns (uint256) {
        return 1;
    }

    /* ────────────────────────────── mint ───────────────────────────── */

    /// @notice Free mint, capped per wallet and in aggregate.
    /// @dev ERC721A writes one ownership slot for the whole batch, so
    ///      minting 10 costs barely more than minting 1.
    function mint(uint256 quantity) external {
        if (quantity == 0) revert ZeroQuantity();
        if (block.timestamp < mintOpens || block.timestamp >= mintCloses) {
            revert MintClosed();
        }
        // _numberMinted counts mints only — burning does not free an
        // allowance, so a wallet cannot mint-burn-repeat past the cap.
        if (_numberMinted(msg.sender) + quantity > MAX_PER_WALLET) {
            revert WalletLimitExceeded();
        }
        if (_totalMinted() + quantity > MAX_SUPPLY) revert SoldOut();

        _mint(msg.sender, quantity);
    }

    /* ──────────────────────────── metadata ─────────────────────────── */

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721A, IERC721A)
        returns (string memory)
    {
        if (!_exists(tokenId)) revert NonexistentToken();
        address r = renderer;
        if (r != address(0)) return IRenderer(r).render(tokenId);
        return _uri;
    }

    /* ───────────────────────── held-since view ─────────────────────── */

    /**
     * @notice Unix timestamp at which the current owner acquired `tokenId`.
     *         Resets on every transfer. This is the field a future accrual
     *         vault reads — it is stored by ERC721A in the same slot as the
     *         owner, so it costs nothing extra.
     */
    function heldSince(uint256 tokenId) public view returns (uint256) {
        if (!_exists(tokenId)) revert NonexistentToken();
        return _ownershipOf(tokenId).startTimestamp;
    }

    /// @notice Seconds the current owner has continuously held `tokenId`.
    function heldFor(uint256 tokenId) external view returns (uint256) {
        return block.timestamp - heldSince(tokenId);
    }

    /// @notice Lifetime mints by `wallet`, for front-end allowance display.
    function numberMinted(address wallet) external view returns (uint256) {
        return _numberMinted(wallet);
    }

    /// @notice True while `mint` would succeed on supply and time alone.
    function mintIsOpen() external view returns (bool) {
        return
            block.timestamp >= mintOpens &&
            block.timestamp < mintCloses &&
            _totalMinted() < MAX_SUPPLY;
    }

    /* ───────────────────────────── admin ───────────────────────────── */

    function setMintWindow(uint64 opens, uint64 closes) external onlyOwner {
        if (closes <= opens) revert WindowInverted();
        mintOpens = opens;
        mintCloses = closes;
        emit MintWindowSet(opens, closes);
    }

    /// @notice Close the mint immediately (e.g. it sold out faster than planned).
    function closeMint() external onlyOwner {
        mintCloses = uint64(block.timestamp);
        emit MintWindowSet(mintOpens, mintCloses);
    }

    function setURI(string calldata uri_) external onlyOwner {
        _uri = uri_;
        emit URISet(uri_);
    }

    /// @notice Point metadata at a renderer contract. Set to address(0) to revert
    ///         to the flat URI.
    function setRenderer(address renderer_) external onlyOwner {
        renderer = renderer_;
        emit RendererSet(renderer_);
    }

    function setDefaultRoyalty(address receiver, uint96 feeNumerator)
        external
        onlyOwner
    {
        _setDefaultRoyalty(receiver, feeNumerator);
    }

    /* ──────────────────────────── interface ────────────────────────── */

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721A, IERC721A, ERC2981)
        returns (bool)
    {
        return
            ERC721A.supportsInterface(interfaceId) ||
            ERC2981.supportsInterface(interfaceId);
    }
}

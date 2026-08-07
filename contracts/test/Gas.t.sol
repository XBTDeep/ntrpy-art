// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Test, console} from "forge-std/Test.sol";
import {NTRPY} from "../src/NTRPY.sol";

contract GasTest is Test {
    NTRPY nft;
    function setUp() public {
        vm.warp(1_800_000_000);
        nft = new NTRPY("ar://EYE", address(0x7EA), 500);
        nft.setMintWindow(uint64(block.timestamp), uint64(block.timestamp + 7 days));
    }
    function test_GasMint1vs10() public {
        uint256 g = gasleft();
        vm.prank(address(0xA1)); nft.mint(1);
        uint256 one = g - gasleft();

        g = gasleft();
        vm.prank(address(0xB2)); nft.mint(10);
        uint256 ten = g - gasleft();

        console.log("mint(1) gas: ", one);
        console.log("mint(10) gas:", ten);
        console.log("per-token in a 10 batch:", ten / 10);
    }
}

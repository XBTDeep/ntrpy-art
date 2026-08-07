// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script, console} from "forge-std/Script.sol";
import {NTRPY} from "../src/NTRPY.sol";

/**
 * Deploy NTRPY.
 *
 *   forge script script/Deploy.s.sol:Deploy \
 *     --rpc-url rh_testnet --private-key $PRIVATE_KEY --broadcast
 *
 * Env:
 *   TOKEN_URI          ar://<tx>  metadata for every token (identical at launch)
 *   ROYALTY_RECEIVER   address that collects secondary royalties
 *   ROYALTY_BPS        e.g. 500 = 5%
 *   MINT_OPENS         unix seconds (0 = leave window unset, open it later)
 *   MINT_CLOSES        unix seconds
 */
contract Deploy is Script {
    function run() external returns (NTRPY nft) {
        string memory uri = vm.envString("TOKEN_URI");
        address royaltyReceiver = vm.envAddress("ROYALTY_RECEIVER");
        uint96 royaltyBps = uint96(vm.envUint("ROYALTY_BPS"));
        uint64 opens = uint64(vm.envOr("MINT_OPENS", uint256(0)));
        uint64 closes = uint64(vm.envOr("MINT_CLOSES", uint256(0)));

        vm.startBroadcast();

        nft = new NTRPY(uri, royaltyReceiver, royaltyBps);

        // Window is optional at deploy — leaving it unset means the mint is
        // closed until you explicitly open it, which is the safer default.
        if (opens != 0 && closes > opens) {
            nft.setMintWindow(opens, closes);
        }

        vm.stopBroadcast();

        console.log("NTRPY deployed at:", address(nft));
        console.log("  max supply:      ", nft.MAX_SUPPLY());
        console.log("  per wallet:      ", nft.MAX_PER_WALLET());
        console.log("  mint opens:      ", nft.mintOpens());
        console.log("  mint closes:     ", nft.mintCloses());
        console.log("  mint is open:    ", nft.mintIsOpen());
    }
}

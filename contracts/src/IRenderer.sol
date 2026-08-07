// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/// @notice Metadata module. Unset at launch (every token returns the same eye);
///         pointed at a real contract once specimens diverge by chapter.
interface IRenderer {
    function render(uint256 tokenId) external view returns (string memory);
}

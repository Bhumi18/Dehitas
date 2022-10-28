// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/0xcert/ethereum-erc721/src/contracts/tokens/nf-token-metadata.sol";
import "https://github.com/0xcert/ethereum-erc721/src/contracts/ownership/ownable.sol";

contract data_nft is NFTokenMetadata, Ownable {
    uint256 private tokenCounter;

    constructor() {
        nftName = "Dehitas";
        nftSymbol = "DEH";
        tokenCounter = 0;
    }

    function mint(address _to, string calldata _uri)
        external
        onlyOwner
        returns (uint256)
    {
        tokenCounter = tokenCounter + 1;
        super._mint(_to, tokenCounter);
        super._setTokenUri(tokenCounter, _uri);
        return tokenCounter;
    }

    //use tokenURI to get metadata of token
}

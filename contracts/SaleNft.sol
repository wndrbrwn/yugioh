// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./MintNft.sol";

contract SaleNft {
    MintNft mintNftContract;

    struct Sale {
        uint saleId;
        uint tokenId;
        uint price;
        address saller;
    }

    mapping(uint => Sale) sales;
    Sale[] onSaleTokens;
    uint saleCounter;

    constructor(address _mintNftAddress) {
        mintNftContract = MintNft(_mintNftAddress);
        saleCounter = 0;
    }

    function setForSaleNft(uint _tokenId, uint _price) public {
        require(mintNftContract.balanceOf(msg.sender, _tokenId) > 0, "Caller is not token owner.");
        require(_price > 0, "Price is zero.");
        require(mintNftContract.isApprovedForAll(msg.sender, address(this)), "Token owner did not approve token.");

        Sale memory sale = Sale({
            saleId: saleCounter,
            tokenId: _tokenId,
            price: _price,
            saller: msg.sender
        });

        sales[saleCounter] = sale;
        onSaleTokens.push(sale);
        saleCounter++;
    }

    function purchaseNft(uint _saleId) public payable {
        Sale memory sale = sales[_saleId];

        require(msg.sender != sale.saller, "Caller is token owner.");
        require(msg.value >= sale.price, "Caller sent lower than price.");
        require(mintNftContract.balanceOf(sale.saller, sale.tokenId) > 0, "Token is not sale.");

        mintNftContract.safeTransferFrom(sale.saller, msg.sender, sale.tokenId, 1, "");

        payable(sale.saller).transfer(msg.value);

        delete sales[_saleId];

        for (uint i = 0; i < onSaleTokens.length; i ++) {
            if (onSaleTokens[i].saleId == _saleId) {
                onSaleTokens[i] = onSaleTokens[onSaleTokens.length - 1];
                onSaleTokens.pop();
            }
        }
    }

    function getOnSaleTokens() public view returns (Sale[] memory) {
        return onSaleTokens;
    }

    function getOnSaleToken(uint _saleId) public view returns (Sale memory) {
        return sales[_saleId];
    }

    function getTokenPrice(uint _saleId) public view returns (uint) {
        return sales[_saleId].price;
    }

    function getOwner(uint _saleId) public view returns (address) {
        return sales[_saleId].saller;
    }
}
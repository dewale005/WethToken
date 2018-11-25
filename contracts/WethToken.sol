pragma solidity ^0.4.2;

contract WethToken {
    //constructor
    // set the total number of tokens
    // read the total number of tokens
    uint256 public totalSupply;

    function WethToken() public {
        totalSupply = 10000000000;
    }
}
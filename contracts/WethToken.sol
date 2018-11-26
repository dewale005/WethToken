pragma solidity ^0.4.2;

contract WethToken {
    string public name = "Weth Token";
    string public symbol = "WTH";
    string public standard = "WTH Token v1.0";
    uint256 public totalSupply;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    mapping (address => uint256) public balanceOf;

    function WethToken (uint256 _initialSupply) public {
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }

    // Transfer
    function transfer(address _to, uint256 _value) public returns (bool success) {
        // Exception is account doesn't have enough
        require(balanceOf[msg.sender] >= _value);
        // Transfer the balance
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        // Transfer Event
        Transfer(msg.sender, _to, _value);
        // Return Boolean
        return true;
    }
}
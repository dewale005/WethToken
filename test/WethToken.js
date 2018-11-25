var WethToken = artifacts.require("./WethToken.sol");

contract("WethToken", function(accounts) {
    it('set the total supply upon deployment', function() {
        return WethToken.deployed().then(function(instance) {
        tokenInstance = instance;
        return tokenInstance.totalSupply();
        }).then(function(totalSupply) {
            assert.equal(totalSupply.toNumber(), 10000000000, "set the total supply to 10,000,000,000")
        });
    });
});
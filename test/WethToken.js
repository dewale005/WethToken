var WethToken = artifacts.require("./WethToken.sol");

contract("WethToken", function(accounts) {
    var tokenInstance;

    it('initialize th contract with the correct values', function() {
        return WethToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function(name) {
            assert.equal(name, 'Weth Token', 'has the correct name');
            return tokenInstance.symbol();
        }).then(function(symbol) {
            assert.equal(symbol, 'WTH', 'has the correct symbol');
            return tokenInstance.standard()
        }).then(function(standard) {
            assert.equal(standard, 'WTH Token v1.0', 'has the correct standard');
        });
    })

    it('allocate the initial supply upon deployment', function() {
        return WethToken.deployed().then(function(instance) {
        tokenInstance = instance;
        return tokenInstance.totalSupply();
        }).then(function(totalSupply) {
            assert.equal(totalSupply.toNumber(), 10000000000, "set the total supply to 10,000,000,000");
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(adminBalance) {
            assert.equal(adminBalance.toNumber(), 10000000000, "It allocates the initial supply to the admin account")
        });
    });
    it("transfers token ownership", function () {
        return WethToken.deployed().then(function (instance) {
            tokenInstance = instance;
            // Test `require` statement first by transferring somethings larger than the sender's balance
            return tokenInstance.transfer.call(accounts[1], 99999999999999999999999);
        }).then(assert.fail).catch(function (error) {
            assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
            return tokenInstance.transfer.call(accounts[1], 250000, { from: accounts[0] });
        }).then(function(success) {
            assert.equal(success, true, "it returns true");
            return tokenInstance.transfer(accounts[1], 250000, { from: accounts[0] });
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
            assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the accounts the tokens are transfered from');
            assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the accounts the tokens are transfered to');
            assert.equal(receipt.logs[0].args._value, 250000, 'logs the transfer ammount');
            return tokenInstance.balanceOf(accounts[1]);
        }).then(function(balance) {
            assert.equal(balance.toNumber(), 250000, 'adds the ammount to the recevivng accounts');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(balance) {
            assert.equal(balance.toNumber(), 9999750000, 'deducts the ammount from the sending accounts');
        });
    });
});


var WethToken = artifacts.require("./WethToken.sol");

module.exports = function (deployer) {
    deployer.deploy(WethToken, 10000000000);
};

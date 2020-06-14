const CoinFlip = artifacts.require("CoinFlip");

module.exports = function (deployer) {
  deployer.deploy(CoinFlip, {
    value: 100000000000000000
  });
};
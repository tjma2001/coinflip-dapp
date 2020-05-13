const CoinFlip = artifacts.require("CoinFlip");
const truffleAssert = require("truffle-assertions");

contract("CoinFlip", async function (accounts) {
  it("Should return 0", async function () {
    let instance = await CoinFlip.deployed();
    await assert(web3.utils.fromWei(await instance.getResult(1, 0, 1), "wei") === '0');
  });
  it("Should return more than 0", async function () {
    let instance = await CoinFlip.deployed();
    await assert(web3.utils.fromWei(await instance.getResult(1, 1, 1), "wei") !== '0');
  });
  it("Should not payout - 0", async function () {
    let instance = await CoinFlip.deployed();
    await truffleAssert.passes(instance.payOut(0, accounts[0]));
  });
  it("Should not crash", async function () {
    let instance = await CoinFlip.deployed();
    await truffleAssert.passes(instance.tossCoin(1, {
      value: web3.utils.toWei("1", "ether"),
      from: accounts[0]
    }));
  });
});
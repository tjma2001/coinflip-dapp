var web3 = new Web3(Web3.givenProvider);
var contractInstance;
const lockObject = {}; //used to prevent bets from taking place while we are waiting on a result
const lock = new Proxy(lockObject, {
  set: function (target, key, value) {
    if (key === "status") {
      target[key] = value;
      console.log("setting lock status to", value);
      if (value === "committing") {
        document.getElementById("savings-wrapper").style.display = "flex";
        document.getElementById("wrapper").style.display = "none";
      } else if (value === true) {
        document.getElementById("savings-wrapper").style.display = "none";
        document.getElementById("wrapper").style.display = "flex";
      } else {
        document.getElementById("savings-wrapper").style.display = "none";
        document.getElementById("wrapper").style.display = "none";
      }
    }

    return true;
  },
});

$(document).ready(function () {
  console.log("document ready");

  window.ethereum
    .enable()
    .then(async function (accounts) {
      contractInstance = new web3.eth.Contract(
        abi,
        "0xC6e623B76B19A828dcC3b2934DAc6824085102B2", {
          from: accounts[0],
        }
      );

      console.log("contract instance", contractInstance);

      // checking if has ongoing bet
      if (await isBetComplete()) {
        lock.status = false;
      } else {
        processOnGoingBet();
      }
    })
    .catch((error) => {
      console.error("an error occurred connecting", error.message);
    });

  $("#bet_amount").val(100);
  $("#heads_button").on("click", () => flip(128));
  $("#tails_button").on("click", () => flip(1));
  $("#reset").on('click', reset);
});

function error(error) {
  console.log('error', error)
}

// Checks the smart contract for an existing ongoing bet
async function isBetComplete() {
  const isComplete = await contractInstance.methods.isGameComplete().call();
  console.log("checking if game is complete", isComplete);
  return isComplete;
}

async function getLatestPayout() {

}

function flip(coinFace) {
  if (lock.status) {
    processOnGoingBet();
    return;
  }

  try {
    $("#result").text("getting result");

    const value = $("#bet_amount").val();
    const denomination = $("#bet_denomination").val();

    var config = {
      value: web3.utils.toWei(value, denomination),
      // gasLimit: web3.utils.toHex('21000'),
      // gasPrice: web3.utils.toHex('20000000000'),
      gas: 1000000,
      gasPrice: '20000000000'

    };

    console.log("config", config);

    contractInstance.methods
      .tossCoin(coinFace)
      .send(config)
      .on("transactionHash", sent)
      .on("receipt", receipt)
      .on("error", error);
  } catch (error) {
    console.error('caught error', error)
  }
}

function sent(hash) {
  console.log("transaction sent", hash);
  lock.status = "committing";
}

async function processOnGoingBet() {
  lock.status = true;

  //perform Check in smart contract to see if we got a result
  console.log("processing bet");
  if (await isBetComplete()) {
    const winnings = await contractInstance.methods.getWinnings().call();
    console.log('winnings', winnings);
    alert(`you won ${winnings}`);

    lock.status = false;
    return;
  }

  setTimeout(async () => {
    await processOnGoingBet();
  }, 5000);
}

async function receipt(receipt) {
  processOnGoingBet();
}

async function reset() {
  await contractInstance.methods.clearTransaction().call();
}
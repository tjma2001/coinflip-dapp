var web3 = new Web3(Web3.givenProvider);
var contractInstance;

$(document).ready(function () {
	window.ethereum.enable().then(function (accounts) {
		contractInstance = new web3.eth.Contract(abi, "0xca2Fe1fdb6CB2b21e90D4826B9CC7d07aCc2e4fd", {
			from: accounts[0]
		});

		console.log('contract instance', contractInstance);
	});
	$("#bet_amount").val(100);
	$("#heads_button").on('click', () => flip(1));
	$("#tails_button").on('click', () => flip(0));
});

function sent(hash) {
	console.log('transaction sent', hash);
}


function receipt(receipt) {

	$("#heads_button").prop('disabled', false);
	$("#tails_button").prop('disabled', false);
	const winnings = receipt.events.coinTossed.returnValues.winnings;
	const denomination = $('#bet_denomination').val();

	if (winnings !== "0") {
		$("#result").text(`Hey, you won ${denomination === "ether" ? web3.utils.fromWei(winnings, "ether"): winnings} ${denomination}`);
	} else {
		$("#result").text(`Sorry. you didn't win anything this time.`);
	}
}

function flip(coinFace) {
	try {
		// disable buttons
		$("#heads_button").prop('disabled', true);
		$("#tails_button").prop('disabled', true);
		$("#result").text("getting result");

		const value = $('#bet_amount').val();
		const denomination = $('#bet_denomination').val();

		var config = {
			value: web3.utils.toWei(value, denomination)
		};

		console.log('config', config)

		contractInstance.methods.tossCoin(coinFace)
			.send(config)
			.on('transactionHash', sent)
			.on('receipt', receipt);
	} catch (error) {
		$("#heads_button").prop('disabled', false);
		$("#tails_button").prop('disabled', false);
	}
}
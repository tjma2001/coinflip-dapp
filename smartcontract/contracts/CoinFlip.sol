pragma solidity 0.5.12;


contract CoinFlip {
    uint256 public balance;
    uint256 public prevBalance;

    modifier costs(uint256 cost) {
        require(msg.value >= cost);
        _;
    }

    event coinTossed(uint256 result, uint256 winnings);
    event transferFailed();

    function getResult(uint256 coinFace, uint256 randomValue, uint256 betValue)
        public
        view
        returns (uint256)
    {
        if (randomValue == coinFace) {
            uint256 toTransfer = balance;
            toTransfer = betValue * 2;

            if (balance - toTransfer < 0) {
                toTransfer = balance;
            }

            return toTransfer;
        }
        return 0;
    }

    function getRandomValue() private view returns (uint256) {
        return now % 2;
    }

    function payOut(uint256 payoutValue, address payoutAddress)
        public
        returns (bool)
    {
        if (payoutValue > 0 && payoutValue <= prevBalance) {
            (bool success, ) = payoutAddress.call.value(payoutValue)("");
            require(success, "Sending failed");
            return success;
        }
        return false;
    }

    function tossCoin(uint256 coinFace)
        public
        payable
        costs(1 wei)
        returns (uint256)
    {
        balance += msg.value;

        uint256 result = getRandomValue();

        uint256 toTransfer = getResult(coinFace, result, msg.value);
        prevBalance = balance;
        balance = balance - toTransfer;

        bool status = payOut(toTransfer, msg.sender);

        if (!status) {
            balance = prevBalance;
            emit transferFailed();
        } else {
            emit coinTossed(result, toTransfer);
        }

        return toTransfer;
    }
}

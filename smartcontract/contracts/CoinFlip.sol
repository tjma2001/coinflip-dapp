import "./provableAPI.sol";

pragma solidity 0.5.12;


contract CoinFlip is usingProvable {
    enum State { processing, complete }

    struct User {
        uint256 balance;
        State state;
        string name;
        uint256 requestId;
        address userAddress;
    }

    uint256 public balance;
    uint256 public prevBalance;
    mapping(address => User) users;
    mapping(uint256 => address) requests;

    modifier costs(uint256 cost) {
        require(msg.value >= cost);
        _;
    }

    event coinTossed(uint256 result, uint256 winnings);
    event transferFailed();

    /**
        this function is called by the oracle to give us the result of our transaction
     */
    function callback() {

    }

    function createRequest(User user) {
        
    }

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

    function getUser(address userAddress) returns User {
        User user = users[address];
        if (!user) {
            user.userAddress = userAddress;
            user.balance = 0;
            user.state = State.complete;
            users[address] = user;
        }
        return user;
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

    function testRandom() public returns(bytes32) {
        bytes32 queryId = bytes32(keccak256("test"))
    }

    function tossCoin(uint256 coinFace)
        public
        payable
        costs(1 wei)
        returns (uint256)
    {
        User user = getUser(msg.sender);

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

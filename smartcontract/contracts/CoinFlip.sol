import "./provableAPI.sol";

pragma solidity 0.5.12;

contract CoinFlip is usingProvable {
    enum State {complete, processing}

    struct User {
        uint256 balance;
        uint256 betAmount;
        bool isHeads;
        uint256 lastPayoutAmount;
        string name;
        bytes32 requestId;
        State state;
        address userAddress;
    }

    uint256 public balance;
    uint256 constant NUM_RANDOM_BYTES_REQUESTED = 1;

    mapping(address => User) users;
    mapping(bytes32 => address) requests;

    event LogNewProvableQuery(string description);
    event GeneratedRandomNumber(
        bool isHeads,
        uint256 number,
        address userAddress
    );
    event GotCallbackResponse(bytes32 queryId);
    event Message(string message);
    event Result(uint256 amount);

    modifier costs(uint256 cost) {
        require(msg.value >= cost);
        _;
    }

    constructor() public payable {
        require(msg.value == 0.1 ether, "0.1 ether required to fund contract");
    }

    /**
        this function is called by the oracle to give us the result of our transaction
     */
    function __callback(bytes32 _queryId, string memory _result) public {
        require(msg.sender == provable_cbAddress());

        emit GotCallbackResponse(_queryId);

        bool isHeads = uint256(keccak256(abi.encodePacked(_result))) % 255 > 127;

        require(
            users[requests[_queryId]].userAddress != address(0),
            "Invalid user address"
        );

        emit GeneratedRandomNumber(
            isHeads,
            uint256(keccak256(abi.encodePacked(_result))) % 255,
            users[requests[_queryId]].userAddress
        );

        if (users[requests[_queryId]].isHeads == isHeads) {
            emit Result(users[requests[_queryId]].betAmount);

            (, users[requests[_queryId]].lastPayoutAmount) = payOut(
                calculatePayout(
                    users[requests[_queryId]].betAmount,
                    users[requests[_queryId]].balance
                ),
                users[requests[_queryId]].userAddress
            );
        } else {
            emit Result(users[requests[_queryId]].betAmount);
            users[requests[_queryId]].lastPayoutAmount = 0;
        }
        users[requests[_queryId]].state = State.complete;

        delete requests[_queryId];
    }

    function calculatePayout(uint256 betAmount, uint256 userBalance)
        public
        pure
        returns (uint256)
    {
        return betAmount * 2 >= userBalance ? userBalance : betAmount * 2;
    }

    function clearTransaction() public {
        users[msg.sender].state = State.complete;
        delete requests[users[msg.sender].requestId];
    }

    function createRequest(address userAddress) public {
        uint256 QUERY_EXECUTION_DELAY = 0;
        uint256 GAS_FOR_CALLBACK = 200000;

        bytes32 requestId = provable_newRandomDSQuery(
            QUERY_EXECUTION_DELAY,
            NUM_RANDOM_BYTES_REQUESTED,
            GAS_FOR_CALLBACK
        );

        requests[requestId] = userAddress;
        users[userAddress].requestId = requestId;

        emit LogNewProvableQuery("Provable Query set. Waiting for the reply");
    }

    function getWinnings() public view returns (uint256) {
        return users[msg.sender].lastPayoutAmount;
    }

    function isGameComplete() public view returns (bool) {
        return users[msg.sender].state == State.complete;
    }

    function payOut(uint256 payoutValue, address payoutAddress)
        public
        returns (bool, uint256)
    {
        users[payoutAddress].balance =
            users[payoutAddress].balance -
            payoutValue;

        balance = balance - payoutValue;
        (bool success, ) = payoutAddress.call.value(payoutValue)("");
        require(success, "Sending failed");
        return (success, payoutValue);
    }

    function testRandom() public returns (bytes32) {
        bytes32 queryId = bytes32(keccak256("test"));
        __callback(queryId, "1", bytes("test"));
        return queryId;
    }

    function tossCoin(uint256 coinFace)
        public
        payable
        costs(1 wei)
        returns (bool)
    {
        // User storage user = users[msg.sender];
        if (users[msg.sender].userAddress == address(0)) {
            users[msg.sender].userAddress = msg.sender;
            users[msg.sender].state = State.complete;
        }

        if (users[msg.sender].state == State.processing) {
            emit Message("Still Processing old bet. Overriding with new bet");
            // return true;
        }

        emit Message(
            coinFace > 127 ? "Flipping for heads" : "Flipping for tails"
        );

        balance += msg.value;

        users[msg.sender].balance += msg.value;
        users[msg.sender].betAmount = msg.value;
        users[msg.sender].isHeads = coinFace > 127;
        users[msg.sender].state = State.processing;

        createRequest(msg.sender);

        return true;
    }
}

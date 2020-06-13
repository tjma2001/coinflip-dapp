const abi = [{
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "internalType": "string",
      "name": "description",
      "type": "string"
    }],
    "name": "LogNewProvableQuery",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "bool",
        "name": "isHeads",
        "type": "bool"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
      }
    ],
    "name": "generatedRandomNumber",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "internalType": "bytes32",
      "name": "queryId",
      "type": "bytes32"
    }],
    "name": "gotCallbackResponse",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }],
    "name": "result",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [],
    "name": "transferFailed",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "balance",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [{
        "internalType": "bytes32",
        "name": "_queryId",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "_result",
        "type": "string"
      }
    ],
    "name": "__callback",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [{
        "internalType": "bytes32",
        "name": "_myid",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "_result",
        "type": "string"
      },
      {
        "internalType": "bytes",
        "name": "_proof",
        "type": "bytes"
      }
    ],
    "name": "__callback",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [{
        "internalType": "uint256",
        "name": "betAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "userBalance",
        "type": "uint256"
      }
    ],
    "name": "calculatePayout",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "clearTransaction",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [{
      "internalType": "address",
      "name": "userAddress",
      "type": "address"
    }],
    "name": "createRequest",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getWinnings",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "isGameComplete",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [{
        "internalType": "uint256",
        "name": "payoutValue",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "payoutAddress",
        "type": "address"
      }
    ],
    "name": "payOut",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "testRandom",
    "outputs": [{
      "internalType": "bytes32",
      "name": "",
      "type": "bytes32"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [{
      "internalType": "uint256",
      "name": "coinFace",
      "type": "uint256"
    }],
    "name": "tossCoin",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  }
]
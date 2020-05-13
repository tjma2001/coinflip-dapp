const abi = [{
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "uint256",
        "name": "result",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "winnings",
        "type": "uint256"
      }
    ],
    "name": "coinTossed",
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
    "constant": true,
    "inputs": [{
        "internalType": "uint256",
        "name": "coinFace",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "randomValue",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "betValue",
        "type": "uint256"
      }
    ],
    "name": "getResult",
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
    "outputs": [],
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
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  }
]
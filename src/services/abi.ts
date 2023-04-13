export const contractAbi = [
	{
		"inputs": [],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "number",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_message",
				"type": "string"
			}
		],
		"name": "borrowACTIVE",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_Id",
				"type": "uint256"
			}
		],
		"name": "borrowActivated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "number",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_message",
				"type": "string"
			}
		],
		"name": "borrowCLOSED",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_Id",
				"type": "uint256"
			}
		],
		"name": "borrowClosed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "number",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_message",
				"type": "string"
			}
		],
		"name": "borrowDeposited",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_Id",
				"type": "uint256"
			}
		],
		"name": "borrowMade",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "number",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_message",
				"type": "string"
			}
		],
		"name": "borrowOPEN",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_message",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_Id",
				"type": "uint256"
			}
		],
		"name": "investmentAdd",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_borrowId",
				"type": "uint256"
			}
		],
		"name": "closeBorrow",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_borrowId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_borrowingGoal",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_borrowingPeriod",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_interestRate",
				"type": "uint256"
			}
		],
		"name": "createBorrow",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_borrowId",
				"type": "uint256"
			}
		],
		"name": "depositMoney",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_borrowId",
				"type": "uint256"
			}
		],
		"name": "getBorrow",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "borrowId",
						"type": "uint256"
					},
					{
						"internalType": "enum CrowdlendingProtocol.BorrowStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "address",
						"name": "borrower",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "borrowingGoal",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "borrowingPeriod",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "interestRate",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalBorrowed",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "borrowBalance",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "address",
								"name": "investor",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "amount",
								"type": "uint256"
							}
						],
						"internalType": "struct CrowdlendingProtocol.Investment[]",
						"name": "investors",
						"type": "tuple[]"
					},
					{
						"internalType": "uint256",
						"name": "startTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "closeTime",
						"type": "uint256"
					}
				],
				"internalType": "struct CrowdlendingProtocol.Borrow",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_borrowId",
				"type": "uint256"
			}
		],
		"name": "getBorrowBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBorrowIds",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_borrowId",
				"type": "uint256"
			}
		],
		"name": "invest",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_borrowId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "percent",
				"type": "uint256"
			}
		],
		"name": "withdrawMoney",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
]
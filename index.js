const express = require('express');
const { ethers } = require('ethers');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());

const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'; 
const wallet = new ethers.Wallet(privateKey, provider);

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const abi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "dataHash",
                "type": "string"
            }
        ],
        "name": "LogAdded",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_dataHash",
                "type": "string"
            }
        ],
        "name": "addLog",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "getLogs",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "dataHash",
                        "type": "string"
                    }
                ],
                "internalType": "struct LogStorage.LogEntry[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

// Listen for LogAdded events emitted by the smart contract
contract.on('LogAdded', (user, timestamp, dataHash) => {
    console.log(`New log added by ${user}`);
    console.log(`Timestamp: ${new Date(timestamp * 1000).toLocaleString()}`);
    console.log(`Data Hash: ${dataHash}`);
    // Here, you could update your application's UI, store the log information, etc.
});

app.post('/addLog', async (req, res) => {
    try {
        const { dataHash } = req.body;
        // simulate log addition logic or interact with blockchain
        console.log('Received dataHash:', dataHash);
        res.status(200).send({ message: 'Log added successfully' });
    } catch (error) {
        console.error('Error in /addLog:', error);
        res.status(500).send({ error: 'Server error' });
    }
});


app.get('/getLogs', async (req, res) => {
    try {
        // Here you would typically retrieve log data, for example, from a database or blockchain
        console.log('Fetching logs');
        // Simulate fetching log data
        const logs = [{ timestamp: new Date(), dataHash: 'exampleHash' }];
        res.status(200).json(logs);
    } catch (error) {
        console.error('Error in /getLogs:', error);
        res.status(500).send({ error: 'Failed to get logs' });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

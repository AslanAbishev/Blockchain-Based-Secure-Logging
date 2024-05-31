// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract LogStorage {
    struct LogEntry {
        uint256 timestamp;
        string dataHash;
    }

    mapping(address => LogEntry[]) private logs;

    event LogAdded(address indexed user, uint256 timestamp, string dataHash);

    function addLog(string memory _dataHash) public {
        LogEntry memory newLog = LogEntry({
            timestamp: block.timestamp,
            dataHash: _dataHash
        });
        logs[msg.sender].push(newLog);
        emit LogAdded(msg.sender, block.timestamp, _dataHash);
    }

    function getLogs(address _user) public view returns (LogEntry[] memory) {
        return logs[_user];
    }
}

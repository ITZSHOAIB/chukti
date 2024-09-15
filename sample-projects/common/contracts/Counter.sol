// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Counter {
    uint256 public number;

    constructor(uint256 _number) {
        number = _number;
    }

    function setNumber(uint256 _number) public {
        number = _number;
    }

    function increment() public {
        number++;
    }

    function decrement() public {
        number--;
    }

    function resetNumber() public {
        number = 0;
    }

    function incrementBy(uint256 _value) public {
        number += _value;
    }
}
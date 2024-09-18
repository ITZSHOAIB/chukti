Feature: Counter contract example

    Scenario: deploy a contract with arguments
        Given a contract at path "contracts/Counter.sol"
        Then deploy the contract with "[10]" arguments and "0" Ether
        When reading the contract function "getNumber" with arguments "[]" and store the result in "currentNumber"

Feature: Counter contract example

    Scenario: deploy a contract with arguments
        Given a contract at path "contracts/Counter.sol"
        Then deploy the contract with "[10]" arguments and "0" Ether
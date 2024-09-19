Feature: Counter contract example

    Scenario: deploy a contract with arguments
        Given a contract at path "contracts/Counter.sol"
        Then deploy the contract with "[10]" arguments and "0" Ether

        When reading the contract function "getNumber" with arguments "[]" and store the result in "currentNumber"
        Then the value stored in "currentNumber" should be "equal to" "10"

        When writing to the contract function "increment" with arguments "[]" and "0" Ether and store the transaction hash in "txHash"
        Then the value stored in "txHash" should be "not equal to" "null"

        When reading the contract function "getNumber" with arguments "[]" and store the result in "currentNumber"
        Then the value stored in "currentNumber" should be "equal to" "11"

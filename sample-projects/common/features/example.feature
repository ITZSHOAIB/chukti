Feature: Counter contract example

    Scenario: deploy a contract with arguments
        Given a contract at path "contracts/Counter.sol"
        Then deploy the contract with "[10]" arguments and "0" Ether
        When reading the contract function "getNumber" with arguments "[]" and store the result in "currentNumber"
        Then the value stored in "currentNumber" should be "equal to" "10"
        Then the value stored in "currentNumber" should be "not equal to" "5"
        Then the value stored in "currentNumber" should be "greater than" "5"
        Then the value stored in "currentNumber" should be "greater than or equal to" "10"
        Then the value stored in "currentNumber" should be "less than" "15"
        Then the value stored in "currentNumber" should be "less than or equal to" "10"

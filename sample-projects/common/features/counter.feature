Feature: Counter contract example

  Scenario: Deploy and interact with the Counter contract
    Given I have a smart contract located at "contracts/Counter.sol"
    Then I deploy the smart contract with constructor arguments "[10]" and send "0" Ether

    When I call the read function "getNumber" from the contract with arguments "[]"
    Then I store the result in "currentNumber"
    And I validate the value stored in "currentNumber" should be "equal to" "10"

    When I call the write function "increment" from the contract with arguments "[]" and send "0" Ether
    And I call the read function "getNumber" from the contract with arguments "[]"
    Then I store the result in "currentNumber"
    And I validate the value stored in "currentNumber" should be "equal to" "11"

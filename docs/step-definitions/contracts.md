---
outline: deep
---
# Contract Step Definitions

Chukti provides a set of smart contract related step definitions that can be used to perform contract interactions in your tests. These step definitions will help you to deploy a contract, perform read and write operations on contract. Each step definition is explained with its purpose, usage, required values, and examples.

## List of Step Definitions

- ### Initialize a contract
```gherkin
Given I have a smart contract located at "path/to/contract.sol"
```
[Read details](#initialize-1)

- ### Deploy a contract
```gherkin
Then I deploy the smart contract with constructor arguments "args" and send "amount" Ether
```
[Read details](#deploy-1)

- ### Read from a contract
```gherkin
When I call the read function "functionName" from the contract with arguments "args"
```
[Read details](#read-contract-1)

- ### Write to a contract
```gherkin
When I call the write function "functionName" from the contract with arguments "args" and send "amount" Ether
```
[Read details](#write-contract-1)

## Detailed Step Definitions

### :rocket: Given I have a smart contract located at "path/to/contract.sol" {#initialize-1}

- **Purpose:**
To load a smart contract from a given file path.

- **Required Values:**
    - `path/to/contract.sol`: The file path to the smart contract relative to the project root.

::: details **Example:**
```gherkin
Given I have a smart contract located at "contracts/MyContract.sol"
```
:::

### :rocket: Then I deploy the smart contract with constructor arguments "args" and send "amount" Ether {#deploy-1}

- **Purpose:**
To deploy a smart contract with given constructor arguments and initial Ether.

- **Required Values:**
    - `args`: Array of comma-separated Constructor arguments for the contract. Pass empty [] if no arguments required.
    - `amount`: Amount of Ether to send with the transaction.

::: details **Example:**
```gherkin
Then I deploy the smart contract with constructor arguments "[10, 'Alice']" and send "0" Ether
```
:::

### :rocket: When I call the read function "functionName" from the contract with arguments "args" {#read-contract-1}

- **Purpose:**
To call a read-only function on the contract with the given name.

- **Required Values:**
    - `functionName`: The name of the contract function to call.
    - `args`: Array of comma-separated Constructor arguments for the contract. Pass empty [] if no arguments required.

::: details **Example:**
```gherkin
When I call the read function "getBalance" from the contract with arguments "['Alice']"
```
:::

### :rocket: When I call the write function "functionName" from the contract with arguments "args" and send "amount" Ether {#write-contract-1}

- **Purpose:**
To call a state-changing (write) function on the contract with specified arguments and Ether.

- **Required Values:**
    - `functionName`: The name of the contract function to call.
    - `args`: Array of comma-separated Constructor arguments for the contract. Pass empty [] if no arguments required.
    - `amount`: Amount of Ether to send with the transaction.

::: details **Example:**
```gherkin
When I call the write function "transfer" from the contract with arguments "['Bob',50]" and send "1" Ether
```
:::
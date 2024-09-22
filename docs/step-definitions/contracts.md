---
outline: deep
---
# Contract Step Definitions

Chukti provides a set of smart contract related step definitions that can be used to perform contract interactions in your tests. These step definitions will help you to deploy a contract, perform read and write operations on contract. Each step definition is explained with its purpose, usage, required values, and examples.

## List of Step Definitions

- ### Initialize a contract
```gherkin
Given a contract at path "path/to/contract.sol"
```
[Read details](#initialize-1)

- ### Deploy a contract
```gherkin
Then deploy the contract with "arguments" arguments and "amount" Ether
```
[Read details](#deploy-1)

- ### Read from a contract
```gherkin
When reading the contract function "functionName" with arguments "arguments" and store the result in "variableName"
```
[Read details](#read-contract-1)

- ### Write to a contract
```gherkin
When writing to the contract function "functionName" with arguments "arguments" and "amount" Ether and store the transaction hash in "variableName"
```
[Read details](#write-contract-1)

## Detailed Step Definitions

### :rocket: Given a contract at path "path/to/contract.sol" {#initialize-1}

- **Purpose:**
To load a smart contract from a given file path.

- **Required Values:**
    - `path/to/contract.sol`: The file path to the smart contract relative to the project root.

::: details **Example:**
```gherkin
Given a contract at path "contracts/MyContract.sol"
```
:::

### :rocket: Then deploy the contract with "arguments" arguments and "amount" Ether {#deploy-1}

- **Purpose:**
To deploy a smart contract with given constructor arguments and initial Ether.

- **Required Values:**
    - `arguments`: Array of comma-separated Constructor arguments for the contract. Pass empty [] if no arguments required.
    - `amount`: Amount of Ether to send with the transaction.

::: details **Example:**
```gherkin
Then deploy the contract with "[10, 'Bob']" arguments and "0" Ether
```
:::

### :rocket: When reading the contract function "functionName" with arguments "arguments" and store the result in "variableName" {#read-contract-1}

- **Purpose:**
To call a read-only function on the contract and store its return value.

- **Required Values:**
    - `functionName`: The name of the contract function to call.
    - `arguments`: Array of comma-separated Constructor arguments for the contract. Pass empty [] if no arguments required.
    - `variableName`: Variable name to store the result.

::: details **Example:**
```gherkin
When reading the contract function "getBalance" with arguments "Alice" and store the result in "aliceBalance"
```
:::

### :rocket: When writing to the contract function "functionName" with arguments "arguments" and "amount" Ether and store the transaction hash in "variableName" {#write-contract-1}

- **Purpose:**
To call a state-changing function on the contract with specified arguments and Ether, and store the transaction hash.

- **Required Values:**
    - `functionName`: The name of the contract function to call.
    - `arguments`: Array of comma-separated Constructor arguments for the contract. Pass empty [] if no arguments required.
    - `amount`: Amount of Ether to send with the transaction.
    - `variableName`: Variable name to store the result.

::: details **Example:**
```gherkin
When writing to the contract function "transfer" with arguments "Bob,50" and "1" Ether and store the transaction hash in "transactionHash"
```
:::
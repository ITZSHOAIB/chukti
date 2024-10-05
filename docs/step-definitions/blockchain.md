---
outline: deep
---
# Blockchain Step Definitions

Chukti provides a set of step definitions that can be used to perform various blockchain-related operations and assertions in your tests. These steps help you to perform various tasks other than contract related blockchain operations. Each step definition is explained with its purpose, usage, required values, and examples.

## List of Step Definitions

- ### Transaction Status Validation
```gherkin
Then I validate the status of the last transaction is "expectedStatus"
```
[Read details](#validate-transaction-status)

- ### Switch wallet address
```gherkin
When I set the active test wallet address to the address "walletAddress"
```
[Read details](#switch-wallet-1)

```gherkin
When I set the active test wallet address to the index {index}
```
[Read details](#switch-wallet-2)

```gherkin
When I fetch the wallet address at index {index}
```
[Read details](#fetch-wallet-index)

## Detailed Step Definitions

### :rocket: Then I validate the status of the last transaction is "expectedStatus" {#validate-transaction-status}

- **Purpose:**
To validate the status of the last transaction.

- **Required Values:**
    - `expectedStatus`: The expected status of the transaction. It can be either `success` or `reverted`.

::: details **Example:**
```gherkin
Then I validate the status of the last transaction is "success"
```
:::

### :rocket: When I set the active test wallet address to the address "walletAddress" {#switch-wallet-1}

- **Purpose:**
To set the active test wallet address to the specified wallet address.

- **Required Values:**
    - `walletAddress`: The wallet address to set as the active test wallet address.

::: details **Example:**
```gherkin
When I set the active test wallet address to the address "0x1234567890abcdef1234567890abcdef12345678"
```
:::

### :rocket: Given I set the active test wallet address to the index {index} {#switch-wallet-2}

- **Purpose:**
To set the active test wallet address to the specified index in the test client list.

- **Required Values:**
    - `index`: The index of the wallet address in the test client list.

::: details **Example:**
```gherkin
Given I set the active test wallet address to the index 1
```
:::

### :rocket: When I fetch the wallet address at index {index} {#fetch-wallet-index}
- **Purpose**
To fetch the wallet address from the provided index without setting it as the active wallet.

- **Required Values:**
    - `index`: The index of the wallet address in the test client list.

::: details **Example**
```gherkin
When I fetch the wallet address at index 2
```
:::

::: tip :bulb: Tip
Wanna learn how to write test using these step definitions? Visit [How To Write Test page](/guide/how-to-write-test).
:::
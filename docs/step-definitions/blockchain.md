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

::: tip :bulb: Tip
Wanna learn how to write test using these step definitions? Visit [How To Write Test page](/guide/how-to-write-test).
:::
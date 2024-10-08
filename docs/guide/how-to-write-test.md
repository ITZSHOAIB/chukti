# How to Write Tests with Chukti

This guide will walk you through writing tests for a Solidity contract using Chukti.

## 1. Writing a Solidity Contract

Let's start by writing a simple Solidity contract named `Counter.sol`. Place this contract inside `contracts/` directory of your Chukti project.

::: code-group
<<< @/../sample-projects/common/contracts/Counter.sol{solidity}[contracts/counter.sol]
:::

## 2. Creating a Feature Test File

Next, we will create a feature test file named `counter.feature` to test the `Counter` contract. This file will be located in the `features/` directory.

::: code-group
<<< @/../sample-projects/common/features/counter.feature{gherkin}[features/counter.feature]
:::

## 3. Running the test

To run the test, follow these steps:

1. Open your terminal and navigate to the Chukti project's root directory
2. Run the Chukti test command:

::: code-group
```bash [npm]
npx chukti test
```
```bash [pnpm]
pnpm dlx chukti test
```
```bash [if Chukti installed globally]
chukti test
```
:::

This command will execute the feature test file and generate a test report. You can check the test report in the test-reports folder.

## 4. Explanation

Let's break down what the feature test file is doing step by step:

- **Check Contract Existence and Compile**:
    - The first step verifies that the `Counter.sol` contract exists at the specified path (`contracts/Counter.sol`).
    - It also checks the compiled artifacts exist of that contract or not.

- **Deploy the Contract**:
    - The contract is deployed with the constructor argument `[10]`, which sets the initial value of `number` to `10`.
    - As no Ether was required for this contract's deployment, the `amount` sent is `0`.

- **Read the Initial Value**:
    - The `getNumber` function is called to read the current value of `number`.
    - The result is stored in the variable `currentNumber`.
    - The test checks that `currentNumber` is equal to `10`, confirming that the contract was deployed correctly with the initial value.

- **Increment the Value**:
    - The `increment` function is called to increase the value of `number` by `1`.
    - The test confirms that the transaction was successful.

- **Read the Incremented Value**:
    - The `getNumber` function is called again to read the updated value of `number`.
    - The result is stored in the variable `currentNumber`.
    - The test checks that `currentNumber` is equal to `11`, confirming that the `increment` function worked as expected.

By following these steps, the feature test file ensures that the `Counter` contract is correctly deployed, and its `increment` function behaves as expected. 
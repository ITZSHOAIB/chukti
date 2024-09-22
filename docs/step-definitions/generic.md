---
outline: deep
---
# Generic Step Definitions

Chukti provides a set of generic step definitions that can be used to perform common operations and assertions in your tests. These steps help you validate the results of contract interactions and ensure that your smart contracts behave as expected. Each step definition is explained with its purpose, usage, required values, and examples.

## List of Step Definitions

- ### Data validation
```gherkin
Then I validate the value stored in "variableName" should be "comparisonOperator" "expectedValue"
```
[Read details](#validation-1)

- ### Store result
```gherkin
Then I store the result in "variableName"
```
[Read details](#store-result-1)

## Detailed Step Definitions

### :rocket: Then I validate the value stored in "variableName" should be "comparisonOperator" "expectedValue" {#validation-1}

- **Purpose:**
To compare the value stored in a variable with an expected value using a specified comparison operator.

- **Required Values:**
    - `variableName`: The name of the variable storing the value to be compared.
    - `comparisonOperator`: The type of comparison (e.g., `equal to`, `not equal to`, `greater than`, `less than`). Check out the list of operators.
    - `expectedValue`: The expected value to compare against.

::: details **Example:**
```gherkin
And I validate the value stored in "currentNumber" should be "equal to" "10"
```
:::

### :rocket: Then I store the result in "variableName" {#store-result-1}

- **Purpose:**
To store the result of the last operation in a specified variable.

- **Required Values:**
    - `variableName`: The name of the variable storing the value to be compared.

::: details **Example:**
```gherkin
Then I store the result in "currentNumber"
```
:::

## Comparison Operators

Here is a list of comparison operators that can be used in the generic step definitions:

- `equal to`: Checks if the actual value is equal to the expected value.
- `not equal to`: Checks if the actual value is not equal to the expected value.
- `greater than`: Checks if the actual value is greater than the expected value.
- `less than`: Checks if the actual value is less than the expected value.
- `greater than or equal to`: Checks if the actual value is greater than or equal to the expected value.
- `less than or equal to`: Checks if the actual value is less than or equal to the expected value.
- `contains`: Checks if the actual value contains the expected value (for string comparisons).
- `does not contain`: Checks if the actual value does not contain the expected value (for string comparisons).

These operators allow you to perform a variety of comparisons to validate the results of your contract interactions.

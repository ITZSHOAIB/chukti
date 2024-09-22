# Why Chukti?

Answer to your first question before using Chukti.

## The Pain Points of Current Smart Contract Testing Ecosystems {#problem}

Testing smart contracts can be a daunting task due to several inherent challenges in the current ecosystems:

- **Complex Setup**: Setting up a testing environment often involves configuring multiple tools and dependencies, which can be time-consuming and error-prone.
- **Steep Learning Curve**: Developers need to learn various testing frameworks, languages, and tools, which can be overwhelming, especially for those new to blockchain development.
- **Boilerplate Code**: Writing repetitive boilerplate code for common operations like deploying contracts, reading and writing to contracts, and comparing results can slow down the development process.
- **Lack of Readability**: Traditional testing frameworks often use syntax that is not easily understandable by non-technical team members, making it difficult for the entire team to collaborate on testing.
- **Limited Extensibility**: Customizing and extending existing testing frameworks to fit specific project needs can be challenging and may require significant effort.

## How Chukti Addresses These Pain Points {#solution}

Chukti is designed to simplify the entire process of testing smart contracts. Here's how it addresses the common pain points of the current smart contract testing ecosystem:

- **Unified Setup**: Chukti supports both Hardhat + Viem and Forge + Anvil setups. You can initialize a new project with a single command, and Chukti will handle the rest. No more worrying about complex configurations or dependencies.
- **Human-Readable Tests**: With Chukti, you write tests in plain English using Cucumber's Gherkin syntax. This makes your tests easy to understand and accessible to all team members, regardless of their technical background.
- **Predefined Steps**: Chukti comes with a set of predefined steps for common operations like deploying contracts, reading and writing to contracts, and comparing results. This reduces the need to write boilerplate code and speeds up the testing process.
- **Extensible and Customizable**: While Chukti provides a lot of functionality out of the box, it's also highly customizable. You can define your own steps and hooks to fit your project's specific needs.

## Enhanced Developer Experience {#developer-experience}

Chukti significantly improves the developer experience by allowing you to write smart contract test scenarios in plain English sentences, just like you are speaking. Here's how:

- **Natural Language Syntax**: Chukti uses Gherkin syntax, which is designed to be human-readable. This means you can write test scenarios that read like plain English sentences, making them easy to understand and communicate.
- **Collaborative Testing**: The readability of Gherkin syntax allows non-technical team members, such as product managers and business analysts, to understand and contribute to the test scenarios. This fosters better collaboration and ensures that everyone is on the same page.
- **Example Scenario**: Here's an example of a test scenario written in plain English using Chukti:

```gherkin
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
```

This scenario is easy to read and understand, even for those who are not familiar with the underlying code.

## Embrace the Future of Smart Contract Testing {#the-future}

By choosing Chukti, you're opting for a tool that streamlines the entire testing process. It reduces the complexity of setting up your environment, simplifies the process of writing tests, and minimizes the need to learn multiple tools. With Chukti, you can focus on what matters most: building and testing your smart contracts.

Continue to [Getting Started](./getting-started.md) to begin your journey with Chukti.
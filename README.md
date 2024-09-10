# Chukti (In Development...)

**Chukti** is a powerful library designed to simplify the process of testing smart contracts using Cucumber's human-readable Gherkin syntax. With Chukti, you can write end-to-end tests for your smart contracts in a language that everyone on your team can understand, from developers to non-technical stakeholders.

## Features

- `Human-Readable Tests`: Write tests in plain English using Gherkin syntax.
- `Flexible Environment`: The initialized project can be later expaned with any other tool.
- `Reusable Step Definitions`: Predefined step definitions for common smart contract operations.
- `Automated Setup`: Quickly initialize new projects with a single command.
- `Extensible`: Easily add custom step definitions to suit your project's needs and scale your project further.

## Getting Started

## prerequisites (Foundry)

Chukti uses [Anvil](https://book.getfoundry.sh/reference/anvil/) and [Forge](https://book.getfoundry.sh/forge/) for local blockchain operations. To get started, you need to have [Foundry](https://book.getfoundry.sh/) installed on your machine. Foundry includes tools like Forge (for building smart contracts) and Anvil (a local Ethereum node).

### Installing Foundry

1.  **Install Foundryup**: Foundryup is a tool to install and manage Foundry. Run the following command in your terminal to install Foundryup:

    ```bash
    curl -L https://foundry.paradigm.xyz | bash
    ```

2.  **Initialize Foundry**: After installing Foundryup, you need to initialize Foundry by running:

    ```bash
    foundryup
    ```

3.  **Verify Installation**: Ensure that Forge and Anvil are installed correctly by running:

        ```bash
        forge --version
        anvil --version
        ```

    Once Foundry is installed, you can proceed with initializing a new project using Chukti.

### Initializing a New Project

To create a new project with Chukti and Cucumber:

- create an empty folder first
- cd into that folder
- Then run either of the below commands:

```bash
chukti init
```

or

```bash
npx chukti init
```

This command sets up a new project with all the necessary configurations and dependencies.

### Install chukti globally

To install Chukti globally, run

```bash
npm install -g chukti
```

### Writing Tests

Chukti allows you to write tests in Gherkin syntax. Here's an example:

```feature
Feature: Counter Contract
    Scenario: Increment the counter
        Given a deployed "Counter" contract
        When I call the "increment" function
        Then the "number" variable should be "1"
```

### Running Tests

To run your Cucumber tests, use the following command:

```bash
chukti test
```

## Example Project

Check out the sample-projects/anvil-cucumber directory for a complete example project. It includes a sample contract (Counter.sol), feature files, and step definitions.

## Acknowledgements

Special thanks to the developers and contributors of Viem, Forge, Anvil and Cucumber for their amazing tools and libraries.

Happy Testing! 🚀

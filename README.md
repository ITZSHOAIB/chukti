# Chukti 🚀 (Crafting Phase)

**Chukti** is a powerful library designed to simplify the process of testing smart contracts using Cucumber's human-readable Gherkin syntax. With Chukti, you can write end-to-end tests for your smart contracts in a language that everyone on your team can understand, from developers to non-technical stakeholders.

## Features ✨

- `Human-Readable Tests`: Write tests in plain English using Gherkin syntax.
- `Flexible Environment`: The initialized project can be later expaned with any other tool.
- `Reusable Step Definitions`: Predefined step definitions for common smart contract operations.
- `Automated Setup`: Quickly initialize new projects with a single command.
- `Extensible`: Easily add custom step definitions to suit your project's needs and scale your project further.

## Getting Started

Chukti supports both `Hardhat+Viem` and `Forge+Anvil` project setups. You can choose the type of project you want to initialize during the setup process. Afterwards the project can be customized and scaled accordingly.

### Initializing a New Project 🛠️

To initialize a Chukti project, use the `npx chukti init` command. You can specify the directory name where you want to initialize the project. If you use `.` as the directory name, it will initialize in the current directory.

- **Initialize**:

  ```bash
  npx chukti init
  ```

- **Initialize in the current directory**:

  ```bash
  npx chukti init .
  ```

- **Initialize in a new directory**:

  ```bash
  npx chukti init my-new-project
  ```

### Choosing Project Type

During the initialization, you will be prompted to choose between the following project types:

```bash
┌  🚀 Initializing a new Chukti project with Cucumber
│
◇  Confirm the folder name to initialize the project:
│  new_project
│
◆  Choose your chukti project setup for new_project:
│  ○ A TypeScript project with Hardhat + Viem
│  ● A Typescript project with Forge + Anvil (should be installed manually)
└
```

### Confused? What to choose?

- **Hardhat + Viem**:

  - Rich Ecosystem: Extensive plugins and tools available.
  - Easy Integration: Seamless integration with Viem for enhanced testing capabilities.
  - Community Support: Large and active community for support and resources.
  - Complexity: Can be more complex to set up and configure for beginners.
  - Performance: Slightly slower compared to Forge in some scenarios.

- **Forge + Anvil**:
  - Performance: Faster execution and testing times.
  - Simplicity: Easier to set up and use for simple projects.
  - Lightweight: Minimal dependencies and overhead.
  - Limited Ecosystem: Fewer plugins and tools compared to Hardhat.
  - Manual Setup: Requires manual installation and configuration of Foundry tools.

### Writing Tests

Chukti allows you to write tests in Gherkin syntax. Here's an example:

```feature
Feature: Counter contract example
    Scenario: deploy a contract with arguments
        Given a contract at path "contracts/Counter.sol"
        Then deploy the contract with "[10]" arguments and "0" Ether
```

### Running Tests

To run your Cucumber tests, use the following command:

```bash
npx chukti test
```

### Install chukti globally

To install Chukti globally, run

```bash
npm install -g chukti
```

## Example Project

Check out the sample-projects directory for a complete example project. It includes a sample contract (Counter.sol), feature files, and step definitions.

## Acknowledgements

Special thanks to the developers and contributors of Viem, Forge, Anvil, Hardhat, and Cucumber for their amazing tools and libraries.

## License 📜

Chukti is licensed under the MIT License. If you have any suggestions, bug reports, or feature requests, feel free to open an issue or submit a pull request. Your feedback is always welcome!

## Contributing 🤝

We welcome contributions from the community! If you have any ideas or suggestions, please open an issue or a pull request.

Happy Testing! 🚀

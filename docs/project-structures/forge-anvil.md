# Forge + Anvil Project Structure

This document provides an overview of the project structure for a Chukti project using Forge and Anvil. Understanding the layout and purpose of each directory and file will help you navigate and manage your project effectively.

## Project Structure

After initializing your Forge + Anvil project, you will have the following structure:

```
my-chukti-project/
├── contracts/
│   └── Counter.sol
├── features/
│   └── counter.feature
├── support/
│   └── chukti/
│       └── steps.ts
├── test-reports/
│   └── test-report.html
├── .gitignore
├── chukti.config.json
├── cucumber.json
├── package.json
├── tsconfig.json
└── README.md
```

## Directory and File Descriptions

### `contracts/`
- `Counter.sol`: This directory contains your Solidity contracts. The `Counter.sol`file is a sample contract provided to get you started. You can add more contracts as needed.

### `features/`
- `counter.feature`: This directory contains your Cucumber feature files. The `counter.feature` file defines test scenarios for the `Counter` contract using Gherkin syntax. You can create additional feature files to test other contracts or scenarios.

### `support/`
- `steps.ts`: This file maps the steps in the `counter.feature` file to the actual code that performs the actions. You can add more step definition files as needed.

### `test-reports/`
- `test-report.html`: This directory will contain the test reports generated after running your tests. The `test-report.html` file is an example of a test report. You can configure the format and location of the reports in your project settings.

### `.gitignore`
- This file specifies which files and directories should be ignored by Git. It includes common directories like `node_modules`, `cache`, and `out`

### `chukti.config.json`
- This is the configuration file for Chukti. It specifies the project type and other settings. For example:

```json
{
  "projectType": "forge-anvil"
}
```

### `cucumber.json`
- This file configures Cucumber for your project. It specifies the paths to your feature files and step definitions, as well as the format and location of the test reports.

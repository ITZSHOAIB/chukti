# Getting Started with Chukti

Welcome to Chukti! This guide will help you get started with initiaizing your smart contracts testing project using Chukti. Follow the steps below to initialize, set up, and start using Chukti.

## Initialize a new project

Chukti comes with a command line tool that helps you initialize a smart contract testing project in no time. Open your terminal and run the following command to initialize a new Chukti project:

:::code-group
```bash [npm]
npx chukti init
```
```bash [pnpm]
pnpm dlx chukti init
```
```bash [if installed globally]
chukti init
```
:::

Initialize by installing `chukti` globally [optional]

:::code-group
```bash [npm]
npm install -g chukti
chukti init
```
```bash [pnpm]
pnpm add -g chukti
chukti init
```
```bash [yarn]
yarn global add chukti
chukti init
```
:::

Answer questions related to the project setup.

<<< ../snippets/init.ansi

## What to choose?

1. **Confirm the folder to initialize the project:**
   - The default folder will be the current directory. You can press `Enter` to initialize Chukti project in the current directory 
   - Or type a different name and press `Enter` to initialize project in a new directory with the given name.

2. **Choose your Chukti project setup:**
   - You will be given two options for the project setup:
     - `A TypeScript project with Hardhat + Viem`
     - `A TypeScript project with Forge + Anvil (should be installed manually)`
   - Use the arrow keys to navigate between the options and press `Enter` to select the desired setup. If you are unsure which setup to choose, consider the following:
     - Choose `Hardhat + Viem` if you prefer using Hardhat for development and testing.
     - Choose `Forge + Anvil` if you prefer using Foundry's Forge and Anvil for development and testing.

After making your selections, the CLI will proceed to set up your project based on the chosen configuration.

## For Newcomers

If you are new to smart contract testing and confused between the options. Here are some insights which might help you take the decision.

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

### Next Steps

Once the project setup is complete, you can start writing your smart contract tests using Chukti. Refer to the documentation for more details on how to write tests, run them, and generate reports.

Happy Testing! 🚀

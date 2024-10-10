# Frequently Asked Questions (FAQ)

## General

### What is Chukti?

Chukti is a testing framework that allows you to write smart contract tests using plain English sentences with Gherkin syntax. It supports both Hardhat + Viem and Forge + Anvil setups.

### How do I install Chukti?

You can install Chukti globally using npm:

::: code-group
```bash [npm]
npm install -g chukti
```
```bash [pnpm]
pnpm add -g chukti
```
```bash [yarn]
yarn add -g chukti
```
:::

## Getting Started

### How do I initialize a new Chukti project?

To initialize a new Chukti project, run the following command:

::: code-group
```bash [npm]
npx chukti init
```
```bash [pnpm]
pnpm dlx chukti init
```
```bash [if Chukti installed globally]
chukti init
```
:::

Checkout the [detailed setup guide](/guide/getting-started)

### What project setups does Chukti support?

Chukti supports the following project setups:

- A TypeScript project with Hardhat + Viem ([Project Structure](/project-structures/hardhat-viem))
- A TypeScript project with Forge + Anvil ([Project Structure](/project-structures/forge-anvil))

## Usage

### How do I run tests with Chukti?

To run tests, navigate to your project directory and execute:

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

### How do I write step definitions?

Chukti provides predefined step definitions for common operations. You can also write custom step definitions in your `support` directory. Refer to the [Step Definitions](/step-definitions/contracts) section for more details. 

Check out the detailed guide on [How to write tests with Chukti](/guide/how-to-write-test)

## Troubleshooting

### What should I do if I encounter an `Unsupported project type` error?

This error occurs when the project type specified in your `chukti.config.json` is not supported. Ensure that your project type is set to either `hardhat-viem` or `forge-anvil`.

### How do I resolve `No Chukti project found in the current directory` error?

This error indicates that Chukti could not find a valid project in the current directory. Make sure you have initialized a Chukti project by running `chukti init`. Or if you have initialized already, make sure your running commands from the project's root directory.

## Advanced

### Can I customize the step definitions?

Yes, you can customize the step definitions by creating your own in the `support` directory. You can also extend the predefined steps provided by Chukti.

## Community and Support

### How can I contribute to Chukti?

We welcome contributions from the community! If you have any ideas, suggestions, or bug reports, please open an issue or a pull request on our [GitHub repository](https://github.com/ITZSHOAIB/chukti).

### Where can I get help?

If you need help, you can check out our documentation or open an issue on our [GitHub repository](https://github.com/ITZSHOAIB/chukti).
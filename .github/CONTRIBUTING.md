# Contributing to Chukti 🚀

Thank you for considering contributing to `Chukti`! We welcome contributions from the community and are excited to see what you can bring to the table. Whether you're a seasoned developer or a beginner, your contributions are valuable.

## Table of Contents

1. [Getting Started](#getting-started)
2. [How to Contribute](#how-to-contribute)
3. [Style Guide](#style-guide)
4. [Documentation](#documentation)
5. [Changesets](#changesets)
6. [Submitting Changes](#submitting-changes)

## Getting Started 🛠️

### Prerequisites

- **Node.js (>= 20.0.0)**
  - Check if you have Node.js installed:
    ```sh
    node -v
    ```
  - If you don't have Node.js installed, follow the [official guide](https://nodejs.org/en/download/) to install it.

- **pnpm (>= 9.12.0)**
  - Check if you have pnpm installed:
    ```sh
    pnpm -v
    ```
  - If you don't have pnpm installed, you can install it using npm:
    ```sh
    npm install -g pnpm
    ```
  - For more details, refer to the [pnpm installation guide](https://pnpm.io/installation).

### Setup

1. **Fork the repository**: Click the "Fork" button at the top right of the repository page.

2. **Clone your fork**:
    ```sh
    git clone https://github.com/ITZSHOAIB/chukti.git
    cd chukti
    ```

3. **Install dependencies**:
    ```sh
    pnpm install
    ```

4. **Build the project**:
    ```sh
    pnpm build
    ```

## How to Contribute 🤝

### Reporting Bugs 🐛

If you find a bug, please open an issue on GitHub with as much detail as possible. Include steps to reproduce the bug, your environment, and any relevant logs.

### Suggesting Enhancements 💡

If you have an idea for an enhancement, please open an issue on GitHub. Describe the enhancement in detail and explain why it would be beneficial to the project.

### Pull Requests 📦

1. **Create a branch**: 
    ```sh
    git checkout -b my-feature-branch
    ```

2. **Make your changes**: Follow the [Style Guide](#style-guide) and ensure your code is well-documented.

3. **Commit your changes**: With a descriptive commit message following the GitHub convention (e.g., `feat:`, `docs:`, `fix:`, etc.).
    ```bash
    git commit -m "feat: Add feature XYZ"
    ```

4. **Push to your branch**:
    ```sh
    git push origin my-feature-branch
    ```

5. **Open a pull request**: Go to the repository on GitHub and click "New pull request". Fill out the template and submit.

## Style Guide 🎨

- Follow the coding standards defined in our `biome.json` file.
- Use `pnpm lint` to check for linting errors.
- Format your code using `pnpm format`.

## Documentation 📚

Documentation is located in the `docs/` directory. To contribute to the documentation:

1. **Edit the relevant markdown files** in the `docs/` directory.
2. **Preview the documentation**:
    ```sh
    pnpm docs:dev
    ```

## Changesets 📦

We use Changesets to manage versioning and publishing. Here’s how you can create a changeset:

1. **Add a new changeset**:
    ```sh
    pnpm changeset
    ```

2. **Follow the prompts** to describe your changes. This will create a new file in the `.changeset/` directory.

3. **Commit the changeset file**:
    ```sh
    git add .changeset/*
    git commit -m "Add changeset for your changes"
    ```

### When to Add a Changeset

Not every change requires a changeset. You should add a changeset if:

- You want the package version to be bumped.
- You want the changes to be published to the npm registry.

Changesets help us keep track of changes and generate changelogs automatically.


## Submitting Changes 🚀

1. Ensure your code follows the style guide.
2. Ensure your changes are well-documented.
3. Open a pull request and fill out the template.
4. **Inspect Your PR**: If you see a red cross ❌ mark in your PR, it means our workflow has detected an issue. The workflow automatically builds and lints your changes. Please inspect your changes, fix any issues, and push the updates to your branch.


Thank you for contributing! Your efforts help make Chukti better for everyone. If you have any questions, feel free to ask in the issues or discussions section.

Happy Coding! 🎉
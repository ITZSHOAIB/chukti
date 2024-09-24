---
layout: home

hero:
  name: "Chukti"
  text: "Testing Smart Contracts Effortlessly"
  tagline: "Write Smart Contract Tests using Plain English Sentences"
  image:
    src: /logo.svg
    alt: Chukti
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: Why Chukti?
      link: /guide/why-chukti
features:
  - title: Human-Readable and Reusable
    icon: 👀
    details: Write tests in plain English with Gherkin syntax, accessible to all team members, and use predefined steps for common operations.
  - title: Flexible and Extensible
    icon: 🧩
    details: Supports Hardhat + Viem and Forge + Anvil setups, with customizable step definitions to fit your project's needs.
  - title: Quick and Automated Setup
    icon: 🤖
    details: Initialize new projects with a single command, streamlining your workflow and saving setup time.
---

## Overview

::: code-group
<<< @/../sample-projects/common/features/counter.feature{gherkin}[features/counter.feature]
<<< @/../sample-projects/common/contracts/Counter.sol{solidity}[contracts/counter.sol]
:::
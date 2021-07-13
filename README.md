[![CI](https://github.com/DeFiCh/explorer/actions/workflows/ci.yml/badge.svg)](https://github.com/DeFiCh/explorer/actions/workflows/ci.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/c206ba9a4fdf0699229c/maintainability)](https://codeclimate.com/github/DeFiCh/explorer/maintainability)
[![TS-Standard](https://badgen.net/badge/code%20style/ts-standard/blue?icon=typescript)](https://github.com/standard/ts-standard)

# [DeFi Explorer](https://v2.explorer.defichain.com)

> https://v2.explorer.defichain.com

[![Netlify Status](https://api.netlify.com/api/v1/badges/7c8f536f-028f-493f-953f-293dcde36f89/deploy-status)](https://app.netlify.com/sites/defi-explorer/deploys)

Work in progress, the new DeFi Explorer built on [DeFi Jellyfish](https://github.com/DeFiCh/jellyfish).

## Developing & Contributing

Thanks for contributing, appreciate all the help we can get. Feel free to make a pull-request, we will guide you along
the way to make it mergeable. Here are some of our documented [contributing guidelines](CONTRIBUTING.md).

We use `npm 7` for this project, it's required to set
up [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces).

```shell
npm install
```

### Getting started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### About `Next.js`

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

### Project Structure

```txt
explorer/
├─ .github/
├─ public/
├─ src/
│  ├─ components/
│  ├─ layouts/
│  ├─ pages/
│  │  ├─ slugs/*.tsx
│  │  └─ index.tsx
│  └─ styles/
└─ cypress/
```

DeFi Explorer project is structured with 2 core directories. Each pull request will likely carry significant changes
into those directories.

Directory               | Description
------------------------|-------------
`/.github`              | workflow for shift left automation
`/public`               | static resources
`/src/components`       | top level components for a shared design language
`/src/layouts`          | top level layouts for shared page layout & components
`/src/pages`            | each page is associated with a route based on its file name
`/app/styles`           | tailwind css style configuration
`/cypress`              | E2E testing

### End-to-end Testing

End-to-end testing tests the entire lifecycle of DeFi Explorer. All components and screen are integrated together as
expected for real use cases. As such test are written for real usage narrative as a normal consumer would. They are
placed in the `/cypress` directory, and we use [Cypress](https://github.com/cypress-io/cypress) to facilitate the
testing.

Cypress is a modern end-to-end testing framework for web. It uses a sequential jest like approach for testing with
automatic wait and retrofitted with many utilities for great testing quality of life. Utilities are further customized
for DeFi explorer with our own construct. We set up a web environment to run end-to-end testing together with a
local [playground](https://github.com/DeFiCh/playground).

To facilitate fast and ephemeral testing culture, we use [DeFi Playground](https://github.com/DeFiCh/playground). DeFi
Playground is a specialized testing blockchain isolated from MainNet for testing DeFi applications. It uses `regtest`
under the hood, you can `npm run playground` for the local playground environment or let it default to remote. Assets
are not real, it can be minted by anyone. Blocks are generated every 3 seconds, the chain resets daily on remote
playground.

### IntelliJ IDEA

IntelliJ IDEA is the IDE of choice for writing and maintaining this library. IntelliJ's files are included for
convenience with basic toolchain setup but use of IntelliJ is totally optional.

### Security issues

If you discover a security vulnerability in
`DeFi Explorer`, [please see submit it privately](https://github.com/DeFiCh/.github/blob/main/SECURITY.md).

## License & Disclaimer

By using `DeFi Explorer` (this repo), you (the user) agree to be bound by [the terms of this license](LICENSE).

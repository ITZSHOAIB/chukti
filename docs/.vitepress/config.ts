import { defineConfig } from "vitepress";

import { version } from "../../package.json";

export default defineConfig({
  title: "Chukti",
  description: "Simplest Smart Contract Testing Library",
  themeConfig: {
    logo: "/logo.svg",
    nav: [
      { text: "Home", link: "/" },
      { text: "Docs", link: "/guide/getting-started", activeMatch: "/guide/" },
      {
        text: `v${version}`,
        items: [
          {
            text: `v${version} (current)`,
            link: "https://www.npmjs.com/package/chukti",
          },
          {
            text: "CHANGELOG",
            link: "https://github.com/ITZSHOAIB/chukti/releases",
          },
        ],
      },
    ],
    sidebar: {
      "/": [
        {
          text: "Guide",
          collapsed: false,
          items: [
            { text: "Why Chukti?", link: "/guide/why-chukti" },
            { text: "Getting Started", link: "/guide/getting-started" },
            { text: "How to Write Test", link: "/guide/how-to-write-test" },
          ],
        },
        {
          text: "Project Structure",
          collapsed: false,
          items: [
            {
              text: "Hardhat + Viem",
              link: "/project-structures/hardhat-viem",
            },
            {
              text: "Forge + Anvil",
              link: "/project-structures/forge-anvil",
            },
          ],
        },
        {
          text: "Step Definitions",
          collapsed: false,
          items: [
            {
              text: "Contracts",
              link: "/step-definitions/contracts",
            },
            {
              text: "Generic",
              link: "/step-definitions/generic",
            },
          ],
        },
        { text: "FAQ", link: "/faq" },
      ],
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/ITZSHOAIB/chukti" },
    ],
    externalLinkIcon: true,
    footer: {
      message: "Released under the MIT License.",
      copyright:
        'Copyright © 2024-present <a href="https://github.com/ITZSHOAIB">Sohab Sk</a>',
    },
    search: {
      provider: "local",
    },
  },
  head: [
    ["meta", { name: "theme-color", content: "#ffffff" }],
    ["link", { rel: "icon", href: "/logo.svg", type: "image/svg+xml" }],
    ["meta", { name: "author", content: "Sohab Sk" }],
    ["meta", { property: "og:title", content: "Chukti" }],
    ['meta', { property: 'og:image', content: 'https://chukti.vercel.app/chukti-og.png' }],
    [
      "meta",
      {
        property: "og:description",
        content: "Simplest Smart Contract Testing Library",
      },
    ],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ['meta', { name: 'twitter:image', content: 'https://chukti.vercel.app/chukti-og.png' }],
  ],
});

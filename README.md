
<p align="center"><a href="https://www.discue.io/" target="_blank" rel="noopener noreferrer"><img width="256" src="https://www.discue.io/icons-fire-no-badge-square/web/icon-192.png" alt="Vue logo"></a></p>

<br/>
<div align="center">

[![GitHub tag](https://img.shields.io/github/tag/discue/vuepress-plugin-outline?include_prereleases=&sort=semver&color=blue)](https://github.com/discue/vuepress-plugin-outline/releases/)
[![Latest Stable Version](https://img.shields.io/npm/v/@discue/vuepress-plugin-outline.svg)](https://www.npmjs.com/package/@discue/vuepress-plugin-outline)
[![License](https://img.shields.io/npm/l/@discue/vuepress-plugin-outline.svg)](https://www.npmjs.com/package/@discue/vuepress-plugin-outline)
<br/>
[![NPM Downloads](https://img.shields.io/npm/dt/@discue/vuepress-plugin-outline.svg)](https://www.npmjs.com/package/@discue/vuepress-plugin-outline)
[![NPM Downloads](https://img.shields.io/npm/dm/@discue/vuepress-plugin-outline.svg)](https://www.npmjs.com/package/@discue/vuepress-plugin-outline)
<br/>
[![contributions - welcome](https://img.shields.io/badge/contributions-welcome-blue)](/CONTRIBUTING.md "Go to contributions doc")
[![Made with Node.js](https://img.shields.io/badge/Node.js->=22-blue?logo=node.js&logoColor=white)](https://nodejs.org "Go to Node.js homepage")

</div>

<br/>

# vuepress-plugin-outline

A plugin for [VuePress](https://vuepress.vuejs.org/) that adds an outline to the right of the screen. 

![Screenshot of discue.io documentation with enabled outline plugin.](screenshot.png)

**Note:** This plugin is specifically designed for discue documentation sites (like [ui.discue.io](https://ui.discue.io)) and might not be suitable for your project unless you're using or basing your theme on the discue theme.

## 📦 Installation

Install the package via npm

```bash
npm install -D @discue/vuepress-plugin-outline
```

## 🚀 Usage
Register the plugin in your `vuepress` config. 

```js
// ./configs/plugins.js
import outlinePlugin from '@discue/vuepress-plugin-outline';

export default [
    // .. other plugins
    outlinePlugin(),
]
```

```js
// ./config.js
import { viteBundler } from '@vuepress/bundler-vite';
import { defineUserConfig } from '@vuepress/cli';
import plugins from './configs/plugins.js';
import defaultTheme from './theme/index.js';

export default defineUserConfig({
    bundler: viteBundler(),
    lang: 'en-US',
    title: 'My Docs',
    theme: defaultTheme({
        // .. theme configuration
    }),
    plugins,
})
```

## 📄 License

[ISC](https://opensource.org/license/isc-license-txt)


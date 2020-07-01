# gatsby-plugin-git-clone

![Version](https://img.shields.io/npm/v/Mrtenz/gatsby-plugin-git-clone) ![License](https://img.shields.io/github/license/Mrtenz/gatsby-plugin-git-clone) [![Travis CI](https://travis-ci.com/Mrtenz/gatsby-plugin-git-clone.svg?branch=master)](https://travis-ci.com/Mrtenz/gatsby-plugin-git-clone)

A simple plugin for Gatsby that clones a remote Git repository before building. This will run `git clone` when you start Gatsby, with `develop` or `build`. If the repository already exists locally, it will update the repository to the latest commit.

This plugin can be used in combination with `gatsby-source-filesystem` to fetch content from a different repository, for example.

## Requirements

* Node.js v10 or newer.
* Git.

## Installation

First, install the package using `npm` or `yarn`.

```
yarn add -D gatsby-plugin-git-clone
```

or

```
npm install --save-dev gatsby-plugin-git-clone
```

## Getting started

To use the plugin, add it to your `gatsby-config.js`:

```js
import { resolve } from 'path';

export default {
  // ...
  plugins: [
    {
      resolve: 'gatsby-plugin-git-clone',
      options: {
        repository: 'https://github.com/foo/bar.git',
        path: resolve(__dirname, './foo')
      }
    }
  ]
}
```

### Options

`gatsby-plugin-git-clone` has a few options:

* `repository` (_required_) - The remote repository to clone.
* `path` (_required_) - The local path to clone the repository to.
* `branch` (_optional_) - The branch to clone.
* `gitOptions` (_optional_) - The options to pass to [`simple-git`](https://github.com/steveukx/git-js). [See the `simple-git` documentation](https://github.com/steveukx/git-js#configuration).


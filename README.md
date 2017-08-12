# ember-redux-freeze

[![Travis][ci-img]][ci-url] [![NPM][npm-img]][npm-url] ![Ember][ember-img]

## Installation

```bash
ember install ember-redux-freeze
```

## Usage

```js
//app/middleware/index.js
import thunk from 'redux-thunk';
import { freeze } from 'ember-redux-freeze';
import config from '../config/environment';

let middleware = [thunk];

if (config !== 'production') {
  middleware.push(freeze);
}

export default middleware;
```

To learn more about `redux-freeze` and how to use it visit the [redux-freeze](https://github.com/buunguyen/redux-freeze) Github page.

[ci-img]: https://img.shields.io/travis/ember-redux/ember-redux-freeze.svg "Travis CI Build Status"
[ci-url]: https://travis-ci.org/ember-redux/ember-redux-freeze
[ember-img]: https://img.shields.io/badge/ember-1.13.13+-green.svg "Ember 1.13.13+"
[npm-img]: https://img.shields.io/npm/v/ember-redux-freeze.svg "NPM Version"
[npm-url]: https://www.npmjs.com/package/ember-redux-freeze

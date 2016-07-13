# redux-map-state
Higher-order Redux reducer which helps apply your existent reducers on any format of state

## Usage

### Install via NPM

```
npm install redux-map-state --save
```

### Import

```javascript
import mapState from 'redux-map-state'; 
// or
var mapState = require('redux-map-state');
```

#### If you need ES6 module
```javascript
import mapState from 'redux-map-state/es6';
```
Use this if you are using [rollup.js](http://rollupjs.org/) or
[webpack 2](http://webpack.github.io/docs/changelog.html#2-1-x-beta), or any
ES2015 modules-compatible bundler which can eliminate unused library code with
[tree-shaking](http://www.2ality.com/2015/12/webpack-tree-shaking.html).

It is recommended to import the library from `redux-map-state/es6` instead of
`redux-map-state/src` because the source code depends on experimental presets from
babel (stage 1-3) and may be incompatible with your bundler or settings.

### Other environments

Use the Universal Module Definition (UMD)

- [mapState.js](dist/mapState.js)
- [mapState.min.js](dist/mapState.min.js) (minified)

## API

### `mapState()`

```js
mapState(
  options: {
    before: ?(stateBefore: any) => newStateBefore,
    after: ?(stateAfter: any) => newStateAfter,
    actionTypes: ?Array<string>
  }
): (reducer) => reducer
```

Creates a higher-order reducer which maps state before and after passing
to a reducer, but does it only for passed action types.

Useful when you want reuse your reducer on state, which has another format.

#### Example

Lets say we have reducer which handles list of objects, but we want to use
it on subtree, which is only one object.

```js
import listReducer from 'listReducer';

const objectReducer = mapState({
  before: (obj) => [obj],
  after: (list) => list[0]
})(listReducer);
```

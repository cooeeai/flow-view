---
title: flow-view
flow: /empty.json
---
# flow-view

> is a visual editor for [Dataflow programming][dataflow_wikipedia], powered by [React]/[Redux]

[Description](#description) |
[Installation](#installation) |
[API](#api) |
[License](#license)

[![Whatchers](http://g14n.info/svg/github/watchers/flow-view.svg)](https://github.com/fibo/flow-view/watchers) [![Stargazers](http://g14n.info/svg/github/stars/flow-view.svg)](https://github.com/fibo/flow-view/stargazers) [![Forks](http://g14n.info/svg/github/forks/flow-view.svg)](https://github.com/fibo/flow-view/network/members)

[![NPM version](https://badge.fury.io/js/flow-view.svg)](http://badge.fury.io/js/flow-view) [![Build Status](https://travis-ci.org/fibo/flow-view.svg?branch=master)](https://travis-ci.org/fibo/flow-view?branch=master) [![Dependency Status](https://david-dm.org/fibo/flow-view.svg)](https://david-dm.org/fibo/flow-view) [![Change log](https://img.shields.io/badge/change-log-blue.svg)](http://g14n.info/flow-view/changelog)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

[![NPM](https://nodei.co/npm-dl/flow-view.png)](https://nodei.co/npm-dl/flow-view/)

## Description

This document refers to *flow-view* v2, which is implemented
in React, yeah! Previous version is still available [here](https://github.com/fibo/flow-view/tree/v1.2.1).

*flow-view* is a reusable visual editor you can use to provide a GUI to your dataflow project. I am using it for [dflow], but, I would like it'd be used by other node projects, like [graft](https://github.com/GraftJS/graft).

> Please, help me give Node a common visual interface. Use *flow-view*!

Any feedback is welcome!

<p><a href="http://codepen.io/fibo/pen/qNNmdd/"><img src="http://blog.codepen.io/wp-content/uploads/2012/06/TryItOn-CodePen.svg" style="width: 10em; height: auto;" /></a></p>

## Installation

With [bower](http://bower.io/) do

```bash
bower install flow-view
```

or use a CDN adding this to your HTML page

```html
<script src="https://cdn.rawgit.com/fibo/flow-view/master/dist/flow-view.min.js"></script>
```

Note that *flow-view* is supposed to be imported in your project build,
so it is recommended you install it with [npm](https://npmjs.org/)

```bash
npm install flow-view
```

## API

In the example code contained in this section, when imported by another
[Redux] app, anything related to *flow-view* is stored in the state
attribute `view`.

### `new Canvas('drawing')`

> flow-view Canvas constructor

* **@param** `{String}` containerId
* **@returns** `{Object}` canvas

Suppose your *containerId* is `drawing`.
In your HTML, **optionally** place a div where you want to mount the canvas.

```html
<div id="drawing"></div>
```

If *flow-view* finds a `document` and does not exist a DOM element
with given *containerId*, a brand new `div` is created and appended
to the page *body*.

Create an empty canvas

```javascript
var Canvas = require('flow-view').Canvas

var canvas = new Canvas('drawing')
```

Note that nothing will happen until you call the [`canvas.render(view)`](#canvasrenderview) method.

### `canvas.containerId`

It is the id of the DOM element container.

### `canvas.container`

It is the DOM element container, if any. On server side, this attribute is `null`.

### `canvas.render(view)`

Draws a view, that is a collection of nodes and links.

* **@param** `{Object}` view
* **@returns** `{void}`

```javascript
canvas.render({
  node: {
    a: {
      x: 80, y: 100,
      width: 100,
      text: 'Drag me',
      outs: ['out1', 'out2', 'out3']
    },
    b: {
      x: 180, y: 200,
      text: 'Click me',
      ins: ['in0', { name: 'in1', type: 'bool' }],
      outs: ['return']
    }
  },
  link: {
    c: {
      from: ['a', 0],
      to: ['b', 1]
    }
  }
})
```

### Actions and reducers

Import *flow-view*  list of action constants

* ADD_LINK
* ADD_NODE
* DEL_LINK
* DEL_NODE
* DRAG_ITEMS
* DRAG_LINK
* END_DRAGGING_ITEMS
* END_DRAGGING_LINK
* HIDE_NODE_SELECTOR
* SELECT_ITEM
* SET_NUM_INS
* SET_NUM_OUTS

You can use also import *flow-view* reducers, for example to augment your
Redux app  *reducers/index.js*.

```javascript
import {
  MY_ACTION
} from '../actions'

// Import actions and reducers from flow-view.
import viewActions from 'flow-view/actions'
import viewReducers from 'flow-view/reducers'

export default function (state, action) {
  let view = Object.assign({}, state.view)

  if (viewActions.includes(action.type)) {
    view = viewReducers(state.view, action)
    // Note that instead of
    //
    //     return state
    //
    // the code below uses
    //
    //      return Object.assign({}, state, { view })
  }

  switch (action.type) {
    case viewActions.ADD_NODE:
      // Intercept the flow-view action and do something else.

      // your code here

      return Object.assign({}, state, { view })

    case MY_ACTION:
      // Do something related to this action, then return the state adding also the view.

      // your code here

      return Object.assign({}, state, { view })

    default:
      return Object.assign({}, state, { view })
  }
}
```

### Components

Import *flow-view* components

```javascript
import { Canvas, Link, Node } from 'flow-view/components'
```

### Initial state

Could be used in your *reducers/index.js*, with something like

```javascript
import viewInitialState from 'flow-view/util/initialState'
import modelInitialState from '../model/initialState'

const initialState = {
  model: modelInitialState,
  view: viewInitialState
}
```

## License

[MIT](http://g14n.info/mit-license)

[dflow]: http://g14n.info/dflow "dflow"
[dataflow_wikipedia]: https://en.wikipedia.org/wiki/Dataflow_programming "Dataflow programming"
[React]: https://facebook.github.io/react/
[Redux]: http://redux.js.org/

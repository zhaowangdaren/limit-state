# limit state

A simple and lightweight state manager

## Usage

### Init

```js
import Store from './index.js'

// init 'test' to state
Store.set('test', new Date().getTime())
```

### Bind Event

```js
// bind event.
Store.bind('test', (v) => {
  console.log('new test value', v, Store.state)
})
```

When change state value, the bound event will be called.

```js
setTimeout(() => {
  // The bound event will be called
  Store.state.test = new Date().getTime() // new text value 1234...00
}, 1000)
```

### Destroy

```js
  // clear property Store.state[key]
  Store.clear(key)
  // clear all properties in Store.state
  Store.clearAll()
```

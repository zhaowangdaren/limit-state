/**
 * limit-state
 */
class Store {
  constructor () {
    this.stateShadow = {}
    this.state = {}
    this.bindStack = {}
  }

  set (key, value) {
    // this.state[key] = new Object(value)
    this.stateShadow[key] = value
    Object.defineProperty(this.state, key, {
      get: () => { return this.stateShadow[key] },
      set: (v) => { 
        this.stateShadow[key] = v
        this.dispatchChange(key)
      },
      enumerable: true,
      configurable: true
    })
    return this
  }

  bind (key, cb) {
    if (typeof this.bindStack[key] === 'undefined') {
      this.bindStack[key] = []
    }
    this.bindStack[key].push(cb)
    return this
  }

  dispatchChange (key) {
    if (typeof this.bindStack[key] !== 'undefined' && this.bindStack[key].length) {
      let len = this.bindStack[key].length
      while (len--) {
        this.bindStack[key][len].call(null, this.state[key])
      }
    }
  }
  
  clear (key) {
    delete this.state[key]
    delete this.stateShadow[key]
    return this
  }
  
  clearAll () {
    for (let key in this.stateShadow) {
      delete this.state[key]
      delete this.stateShadow[key]
    }
    return this
  }
}

const store = new Store()

export default store

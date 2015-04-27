# firebase-export-value [![Build Status](https://travis-ci.org/bendrucker/firebase-export-value.svg?branch=master)](https://travis-ci.org/bendrucker/firebase-export-value)
Create Firebase export objects like Firebase's [`snapshot.exportVal`](https://www.firebase.com/docs/web/api/datasnapshot/exportval.html)

## Installing

```sh
npm install firebase-export-value
```

## API

##### `exportValue(data, priority [, Function child])` -> `Any`

`exportValue` takes three arguments:

* `data`: any valid Firebase data value (an object with 1 or more keys, `null`, a `String`, or a `Number`)
* `priority`: the data priority
* `child`: a `Function` that accepts a `key` and returns an array containing the same arguments passed to `exportValue` but for the given `key` in `data`

`child` is required if `data` is an object. `child` is used to traverse the object, generating `data`, `priority`, and `child` at each object Node and passing it to `exportVal` until all nodes are primitive values.

## Example

In this example, we'll increment the priority at every key for a shallow object. 

```js
var priority = 0
var data = {
  foo: 'bar',
  baz: 'qux'
}
function child (key) {
  return [data[key], ++priority]
}
exportValue(data, priority, child)
```

The result looks like this:

```js
{
  '.priority': 0
  foo: {
    '.priority': 1,
    '.value': 'bar'
  },
  baz: {
    '.priority': 2,
    '.value': 'qux'
  }
}
```

# firebase-export-value [![Build Status](https://travis-ci.org/bendrucker/firebase-export-value.svg?branch=master)](https://travis-ci.org/bendrucker/firebase-export-value) [![Greenkeeper badge](https://badges.greenkeeper.io/bendrucker/firebase-export-value.svg)](https://greenkeeper.io/)

> Create Firebase export objects like Firebase's [`snapshot.exportVal`](https://www.firebase.com/docs/web/api/datasnapshot/exportval.html)

## Installing

```sh
npm install firebase-export-value
```

## Usage

```js
var exportValue = require('firebase-export-value')
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

Result:

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

## API

#### `exportValue(data, priority, child)` -> `any`

##### data

*Required*  
Type: `any`

The data to transform. Can be a value or an object.

##### priority

Type: `any`  
Default: `null`

##### child

Type: `function`  

Required for data objects. Called with `key`, `value`, and `object` for each key/value pair in the data object and should return an array containing the same arguments passed to `exportValue` but for the given `key` in `data`.

`child` is used to traverse the object, generating `data`, `priority`, and `child` at each object Node and passing it to `exportVal` until all nodes are primitive values.

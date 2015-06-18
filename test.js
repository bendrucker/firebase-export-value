'use strict'

var test = require('tape')
var sinon = require('sinon')
var exportVal = require('./')

test(function (t) {
  t.equal(exportVal(1), 1, 'value without priority')
  t.deepEqual(exportVal(1, 2), {
    '.priority': 2,
    '.value': 1
  }, 'value with priority')
  let child = sinon.stub().withArgs('foo', 'bar', sinon.match({foo: 'bar'})).returns(['bar', 1])
  t.deepEqual(exportVal({foo: 'bar'}, null, child), {
    foo: {
      '.value': 'bar',
      '.priority': 1
    }
  }, 'transforms object')
  const deepChild = sinon.stub().withArgs('bar').returns(['baz', 1])
  child = sinon.stub().withArgs('foo').returns([{bar: 'baz'}, null, deepChild])
  t.deepEqual(exportVal({foo: {bar: 'baz'}}, null, child), {
    foo: {
      bar: {
        '.value': 'baz',
        '.priority': 1
      }
    }
  }, 'transforms object recursively')
  t.end()
})

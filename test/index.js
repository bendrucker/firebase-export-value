'use strict'

import test from 'tape'
import {stub, match} from 'sinon'
import exportVal from '../'

test((t) => {
  t.equal(exportVal(1), 1, 'value without priority')
  t.deepEqual(exportVal(1, 2), {
    '.priority': 2,
    '.value': 1
  }, 'value with priority')
  let child = stub().withArgs('foo', 'bar', match({foo: 'bar'})).returns(['bar', 1])
  t.deepEqual(exportVal({foo: 'bar'}, null, child), {
    foo: {
      '.value': 'bar',
      '.priority': 1
    }
  }, 'transforms object')
  const deepChild = stub().withArgs('bar').returns(['baz', 1])
  child = stub().withArgs('foo').returns([{bar: 'baz'}, null, deepChild])
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

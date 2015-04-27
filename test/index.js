'use strict'

import test from 'tape'
import exportVal from '../'

test((t) => {
  t.equal(exportVal(1), 1, 'value without priority')
  t.deepEqual(exportVal(1, 2), {
    '.priority': 2,
    '.value': 1
  }, 'value with priority')
  t.end()
})

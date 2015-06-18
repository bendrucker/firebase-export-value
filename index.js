'use strict'

module.exports = function exportVal (data, priority, child) {
  var output = {}
  var hasPriority = priority != null
  if (hasPriority) {
    output['.priority'] = priority
  }
  if (typeof data !== 'object') {
    if (hasPriority) return set(output, ['.value', data])
    return data
  }
  return Object.keys(data)
    .map(function (key) {
      return [key, exportVal.apply(null, child(key, data[key], data))]
    })
    .reduce(set, output)
}

function set (destination, kv) {
  var key = kv[0]
  var value = kv[1]
  destination[key] = value
  return destination
}

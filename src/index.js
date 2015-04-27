'use strict'

export default function exportVal (data, priority, child) {
  const output = {}
  const hasPriority = priority != null
  if (hasPriority) {
    output['.priority'] = priority
  }
  if (typeof data !== 'object') {
    if (hasPriority) {
      return set(output, ['.value', data])
    } else {
      return data
    }
  }
  return Object.keys(data)
    .map((key) => {
      return [key, exportVal(...child(key))]
    })
    .reduce(set, output)
}

function set (destination, [key, value]) {
  destination[key] = value
  return destination
}

#!/usr/bin/env node

function inArr(item, arr) {
  for (const it of arr) {
    if (item === it) {
      return true
    }
  }
  return false
}

module.exports = {
  'inArr': inArr
}

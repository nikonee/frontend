;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'function' && define.amd
    ? define(factory)
    : (global = global || self)
})(this, function () {
  'use strict'

  const baseSize = 100
  const baseWidth = 1920
  function resetBaseFontSize() {
    const ratio = (baseSize / baseWidth).toFixed(2)
    const width = document.body.clientWidth || document.documentElement.clientWidth
    let dom = document.getElementsByTagName('html')[0]
    dom.style.fontSize = width * ratio + 'px'
  }
  window.addEventListener('resize', resetBaseFontSize)
  resetBaseFontSize()
})

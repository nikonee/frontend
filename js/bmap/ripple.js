;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'function' && define.amd
    ? define(factory)
    : ((global = global || self), (global.Ripple = factory()))
})(this, function () {
  function Ripple(point, opts) {
    this.point = point
    this.opts = opts || {
      width: 20,
      height: 20,
      color: 'blue',
      click: null,
      mouseover: null,
      mouseout: null,
    }
  }
  // 继承百度地图覆盖物基类
  Ripple.prototype = new BMap.Overlay()
  Ripple.prototype.initialize = function (bmap) {
    const node = document.createElement('div')
    node.classList.add('ripple')
    node.style.zIndex = 999
    node.style.position = 'absolute'
    node.style.width = this.opts.width + 'px'
    node.style.height = this.opts.height + 'px'
    node.style.backgroundColor = this.opts.color

    node.onclick = this.opts.click
    node.onmouseover = this.opts.mouseover
    node.onmouseout = this.opts.mouseout

    bmap.getPanes().markerPane.appendChild(node)
    this.bmap = bmap
    this.node = node

    return node
  }
  Ripple.prototype.draw = function () {
    const pixel = this.bmap.pointToOverlayPixel(this.point)
    this.node.style.top = pixel.y - this.opts.height + 'px'
    this.node.style.left = pixel.x - this.opts.width + 'px'
  }
  Ripple.prototype.show = function () {
    if (this.node) {
      this.node.style.display = 'block'
    }
  }
  Ripple.prototype.hide = function () {
    if (this.node) {
      this.node.style.display = 'none'
    }
  }
  Ripple.prototype.toggle = function () {
    if (this.node) {
      if (this.node.style.display == 'block') {
        this.hide()
      } else {
        this.show()
      }
    }
  }

  return Ripple
})

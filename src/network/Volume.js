import { start } from "pretty-error"

export default class Volume {
  constructor(width, height) {
    this.width = width
    this.height = height
  }

  set data(val) {
    this._data = val
    const depth = val.length / this.layerArea
    if (depth !== Math.floor(depth)) throw new Error("invalid data, length wrong")
    this.depth = depth
  }

  get data() {
    return this._data
  }

  get layerArea() {
    return this.width * this.height
  }

  mapLayers(callback) {
    for (let i = 0; i < this.data.length; i++) {
      const startIdx = i * this.layerArea
      const endIdx = startIdx + this.layerArea
      const layer = this.data.slice(startIdx, endIdx)
      callback(layer, i, this)
    }
  }
}

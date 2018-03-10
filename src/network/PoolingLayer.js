import Layer from "./Layer"
import Matrix from "./Matrix"
import { arrayAdd } from "./utils"

export default class PoolingLayer extends Layer {
  type = "pooling"

  constructor({ inW, inH, stride = 2, filterSize = 2 }) {
    super()
    this.inW = inW
    this.inH = inH
    this.stride = stride
    this.filterSize = filterSize
  }

  getOutput(activation) {
    const { input } = activation
    const outW = Math.floor(this.inW / this.stride)
    const outH = Math.floor(this.inH / this.stride)
    this.w = []
    const ret = input.map(singleInputArr => {
      let layerW = []
      let newImg = []
      for (let y = 0; y < this.inH; y += this.stride) {
        for (let x = 0; x < this.inW; x += this.stride) {
          //loop filter
          let maxValue = -Infinity
          let maxIdx
          for (let oy = 0; oy < this.filterSize; oy++) {
            for (let ox = 0; ox < this.filterSize; ox++) {
              const actualX = x + ox
              const actualY = y + oy
              if (actualX < this.inW && actualY < this.inH) {
                const idx = actualY * this.inW + actualX
                const localMax = singleInputArr[idx]
                if (localMax > maxValue) {
                  maxValue = localMax
                  maxIdx = idx
                }
              } else {
                maxValue = Math.max(maxValue, 0)
              }
            }
          }
          layerW.push(maxIdx)
          newImg.push(maxValue)
        }
      }
      this.w.push(layerW)
      return newImg
    })

    activation.output = ret
  }

  getInputGradient(activation) {
    const inputGradient = activation.outputGradient.map((og, wi) => {
      const inpGrad = Array(this.inW * this.inH).fill(0)
      og.forEach((grad, i) => {
        inpGrad[this.w[wi][i]] += grad
      })
      return inpGrad
    })
    activation.inputGradient = inputGradient
  }

  toJSON() {
    return {
      inW: this.inW,
      inH: this.inH,
      stride: this.stride,
      filterSize: this.filterSize,
    }
  }

  static fromJSON(json) {
    const { inW, inH, stride, filterSize } = json
    return new this({ inW, inH, stride, filterSize })
  }
}

1010101010101000011010101010101000000000000000010000000000000000101010101010001010101010000010100000000000000100000000000110000010101010101001101010100010101010000000000000000000000001000000001010101010011010101010011010101000000000000000000000000000000000101010100110101010100010101010100000000000000000000001000000000010101000101010101010011010101010000000100000000000000000000000001010101010101010101010101010101000000000000000000000000000000000101000101010100000001010101010100000010000000010011000000000000010100110101010101010101010101010000000000000000000000000000000001010011010101010101010101010101000000000000000000000000000000000101010011010101010101010101010100000000000000000000000000000000010101010011010101010101010101010000000000000000000000000000000001010101010101000101010101010101000000000000000010000000000000000101010101010100110101010101010100000000000000000000000000000000010101010101010101010101010101010000000000000000000000000000000001010101010101010101010101010101000000000000000000000000000000000

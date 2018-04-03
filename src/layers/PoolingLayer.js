import Layer from "../Layer"
import Matrix from "../Matrix"
import { arrayAdd, flatten } from "../utils"
import invariant from "invariant"

/**
 * Pooling layer
 * reduces the input size by taking the maximum value within the filterSize
 * sampling every stride steps
 * @extends Layer
 */
export default class PoolingLayer extends Layer {
  type = "pooling"

  /**
   * @param  {Object} params
   * @param  {number} params.inW - width of input
   * @param  {number} params.inH - height of input
   * @param  {number} params.stride=2 - size of step
   * @param  {number} params.filterSize=2 - size of pooling filter
   */
  constructor({
    inW,
    inH,
    inD,
    stride = 2,
    strideX,
    strideY,
    filterSize = 2,
    filterW,
    filterH,
    zeroPadding = 0,
    zeroPaddingX,
    zeroPaddingY,
  }) {
    super()

    invariant(
      inW !== undefined && inH !== undefined && inD !== undefined,
      "must specify inW, inH, and inD"
    )
    this.inW = inW
    this.inH = inH
    this.inD = inD
    this.strideX = strideX || stride
    this.strideY = strideY || stride
    this.filterW = filterW || filterSize
    this.filterH = filterH || filterSize
    this.zeroPaddingX = zeroPaddingX || zeroPadding
    this.zeroPaddingY = zeroPaddingY || zeroPadding
  }

  volumize(data) {
    const area = this.inW * this.inH
    return Array(this.inD)
      .fill(null)
      .map((_, i) => data.slice(i * area, (i + 1) * area))
  }

  /** @inheritdoc */
  getOutput(activation) {
    const {
      inW,
      inH,
      zeroPaddingX,
      zeroPaddingY,
      strideX,
      strideY,
      filterW,
      filterH,
    } = this
    activation.maxIndices = []

    activation.output = activation.input.map((singleInputArr, inputIdx) => {
      const input = this.volumize(singleInputArr)
      let maxIndices = []
      const layerMaxes = input.map((layer, layerIdx) => {
        let values = []

        for (
          let y = -zeroPaddingY;
          y <= inH + zeroPaddingY - filterH;
          y += strideY
        ) {
          for (
            let x = -zeroPaddingX;
            x <= inW + zeroPaddingX - filterW;
            x += strideX
          ) {
            let maxValue = -Infinity
            let maxIndex = null
            for (let oy = 0; oy < filterW; oy++) {
              for (let ox = 0; ox < filterH; ox++) {
                const ax = x + ox
                const ay = y + oy

                let val
                let idx
                let inZPadding = false
                if (ax < 0 || ax >= inW || ay < 0 || ay >= inH) {
                  inZPadding = true
                  val = 0
                } else {
                  idx = ay * inW + ax
                  val = layer[idx]
                }

                if (val > maxValue) {
                  maxValue = val
                  maxIndex = inZPadding ? null : idx + layerIdx * inW * inH
                }
              }
            }
            values.push(maxValue)
            if (maxIndex !== null) maxIndices.push(maxIndex)
          }
        }

        return values
      })

      activation.maxIndices[inputIdx] = flatten(maxIndices)
      return flatten(layerMaxes)
    })
  }

  /** @inheritdoc */
  getInputGradient(activation) {
    activation.inputGradient = activation.outputGradient.map((og, wi) => {
      const inpGrad = Array(this.inW * this.inH * this.inD).fill(0)
      activation.maxIndices[wi].forEach((maxIdx, i) => {
        inpGrad[maxIdx] += og[i]
      })
      return inpGrad
    })
  }

  /** @inheritdoc */
  toJSON() {
    return {
      inW: this.inW,
      inH: this.inH,
      stride: this.stride,
      filterSize: this.filterSize,
    }
  }

  /** @inheritdoc */
  static fromJSON(json) {
    const { inW, inH, stride, filterSize } = json
    return new this({ inW, inH, stride, filterSize })
  }
}

// const layer = new PoolingLayer({
//   inW: 4,
//   inH: 4,
//   inD: 2,
//   zeroPadding: 0,
//   stride: 2,
//   filterSize: 2,
// })

// const activ = {
//   input: [
//     [
//       3,
//       1,
//       2,
//       4,
//       0,
//       2,
//       5,
//       1,
//       0,
//       0,
//       1,
//       3,
//       0,
//       0,
//       3,
//       3,
//       //l2
//       1,
//       2,
//       1,
//       2,
//       1,
//       3,
//       3,
//       2,
//       4,
//       1,
//       4,
//       5,
//       0,
//       0,
//       0,
//       0,
//     ],
//   ],
// }

// layer.getOutput(activ)

// activ.outputGradient = [[1, 1, 1, 1, 1, 1, 1, 1]]
// layer.getInputGradient(activ)
// console.log(activ)

// throw "pooling"

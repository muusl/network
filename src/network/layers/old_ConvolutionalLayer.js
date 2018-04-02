import Layer from "../Layer"
import Matrix from "../Matrix"
import { arrayAdd, createArray, loop, sum } from "../utils"

/**
 * Convolutional Layer
 * errrrr google it :/
 * @extends Layer
 */
export default class ConvolutionalLayer extends Layer {
  type = "convolutional"

  /**
   * @param  {Object} params
   * @param  {number} params.inW - input width
   * @param  {number} params.inH - input height
   * @param  {number} params.inD - input depth
   * @param  {number} [params.stride=2] - stride length
   * @param  {number} [params.filterSize=2] - size of filter
   * @param  {number} [filters=8] - number of filters to use
   * @param  {number} [zeroPadding=0] - padding to be applied before convolutions
   */
  constructor({
    inW,
    inH,
    inD,
    stride = 2,
    filterSize = 2,
    filters: filterCount = 8,
    zeroPadding = 0,
  }) {
    super()
    this.stride = stride
    this.filterSize = filterSize
    this.filterCount = filterCount
    this.zeroPadding = zeroPadding

    this.inW = inW
    this.inH = inH
    this.inD = inD

    this.outW =
      Math.floor(
        (this.inW + 2 * this.zeroPadding - this.filterSize) / this.stride
      ) + 1
    this.outH =
      Math.floor(
        (this.inH + 2 * this.zeroPadding - this.filterSize) / this.stride
      ) + 1
    this.outDepth = this.filterCount

    this.filters = createArray(this.filterCount, () => {
      return createArray(filterSize * filterSize * inD, i => Math.random())
    })

    this.filters[0] = [1, 0, -1, 1, 0, -1, 1, 0, -1]
    this.filters[1] = [-1, 0, 1, -1, 0, 1, -1, 0, 1]
    this.filters[2] = [1, 1, 1, 0, 0, 0, -1, -1, -1]
    this.filters[3] = [-1, -1, -1, 0, 0, 0, 1, 1, 1]
    this.filters[4] = [1, 2, 1, 2, 4, 2, 1, 2, 1]
    this.filters[5] = [0, -1, 0, -1, 4, -1, 0, -1, 0]
    this.filters[6] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    this.b = createArray(this.filterCount, 0)
  }

  /** @inheritdoc */
  getOutput(activation) {
    const { input } = activation
    const { inW, inH, inD, zeroPadding, filterSize, stride } = this

    activation.output = input.map(singleInputArr => {
      let colled = im2col(
        singleInputArr,
        inW,
        inH,
        inD,
        filterSize,
        filterSize,
        stride,
        zeroPadding
      )
      const x = Matrix.dot(this.filters, colled).map((row, i) =>
        row.map(cell => cell + this.b[i])
      )
      const flattened = x.reduce((acc, row) => acc.concat(row), [])
      return flattened
    })

    // console.log(activation.output[0].slice(0, 14 * 14))
    // throw "asd"
  }

  // move the output gradent backwards along the weights
  /** @inheritdoc */
  getInputGradient(activation) {
    const {
      inW,
      inH,
      inD,
      outW,
      outH,
      outD,
      zeroPadding,
      filterSize,
      stride,
    } = this

    activation.inputGradient = activation.outputGradient.map(
      singleOutputGradArr => {
        console.log(singleOutputGradArr)
        // let colled = im2col(singleOutputGradArr, outW, outH, outD, filterSize, filterSize, stride, zeroPadding)
        // console.log(colled)
        const x = Matrix.dot(Matrix.transpose(this.filters), [
          singleOutputGradArr,
        ])
        console.log(x)
        const y = col2im(
          x,
          inW,
          inH,
          inD,
          filterSize,
          filterSize,
          stride,
          zeroPadding
        )
        const flattened = Matrix.flatten(y)
        console.log(y)
        console.log(flattened)
        debugger
        return flattened
      }
    )
  }

  /** @inheritdoc */
  getParams() {
    return this.filters.reduce((acc, f) => acc.concat(Matrix.flatten(f)), [])
  }

  /** @inheritdoc */
  setParams(val) {
    console.log("-----")
    console.log(val)
    throw new Error("setParams")
  }

  /** @inheritdoc */
  getParamGrads(activation) {
    const { input, outputGradient } = activation
    const {
      inW,
      inH,
      outW,
      outH,
      stride,
      zeroPadding,
      filters,
      filterSize,
    } = this

    const paramGrads = outputGradient.map((singleOutputGradArr, i) => {
      const singleInputArr = input[i]

      const filters = []
      for (let d = 0; d < this.filters.length; d++) {
        const filter = Matrix.create(filterSize, filterSize, () => 0)

        for (let y = 0; y < outH; y++) {
          for (let x = 0; x < outW; x++) {
            const outputGradientValue =
              singleOutputGradArr[d * outW * outH + y * outW + x]
            const inY = stride * y - zeroPadding
            const inX = stride * x - zeroPadding
            for (let oy = 0; oy < filterSize; oy++) {
              for (let ox = 0; ox < filterSize; ox++) {
                const actualY = inY + oy
                const actualX = inX + ox
                let inputValue
                if (
                  actualX < 0 ||
                  actualX >= inW ||
                  actualY < 0 ||
                  actualY >= inH
                ) {
                  // its in the zero padding area
                  inputValue = 0
                } else {
                  inputValue = singleInputArr[actualY * inW + actualX]
                }
                filter[oy][ox] += inputValue * outputGradientValue
              }
            }
          }
        }
        filters.push(Matrix.flatten(filter))
      }

      return filters.reduce((acc, f) => acc.concat(f), [])
    })
    return paramGrads
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

// import Activation from "./Activation"

// const activ = new Activation()
// activ.input = [[3, 3, 2, 1, 0, 0, 0, 1, 3, 1, 3, 1, 2, 2, 3, 2, 0, 0, 2, 2, 2, 0, 0, 0, 1]]
// // activ.outputGradient = [[1,2,3,4,5,6,7,8,9]]

// const layer = new ConvolutionalLayer({
//   inW: 5,
//   inH: 5,
//   inD: 1,
//   filterSize: 3,
//   filters: 1,
//   stride: 1,
//   zeroPadding: 0,
// })
// layer.filters[0] = [0, 1, 2, 2, 2, 0, 0, 1, 2]
// // // // layer.filters[1] = [[1, 2], [4, 8]]
// // console.log(layer.filters)

// layer.getOutput(activ)
// console.log("-----")
// console.log(activ.output)
// console.log("-----")
// const paramGrads = layer.getInputGradient(activ)

// console.log(activ.inputGradient)

// // [ 2025, 2412, 2994, 3426 ]

function im2col(arr, inw, inh, inD, fw, fh, stride, padding) {
  const outw = Math.floor((inw + 2 * padding - fw) / stride) + 1
  const outh = Math.floor((inh + 2 * padding - fh) / stride) + 1

  const out = []

  for (let d = 0; d < inD; d++) {
    for (let oy = 0; oy < fh; oy++) {
      for (let ox = 0; ox < fw; ox++) {
        let filter = []
        for (let y = -padding; y + fh <= inh + padding; y += stride) {
          for (let x = -padding; x + fw <= inw + padding; x += stride) {
            const actualY = y + oy
            const actualX = x + ox
            let value
            if (
              actualX < 0 ||
              actualX >= inw ||
              actualY < 0 ||
              actualY >= inh
            ) {
              // zero padding
              value = 0
            } else {
              const actualIdx = d * inw * inh + actualY * inw + actualX
              value = arr[actualIdx]
            }
            filter.push(value)
          }
        }

        out.push(filter)
      }
    }
  }

  return out
}

function col2im(arr, inw, inh, ind, fw, fh, stride, padding) {
  const outH = Math.floor((inh + 2 * padding - fh) / stride) + 1

  const inp = Matrix.create(inw, inh)

  arr.forEach((row, rowIdx) => {
    // rowIdx corrisponds to position in filter
    const ox = rowIdx % fw
    const oy = Math.floor(rowIdx / fw)

    row.forEach((cell, colIdx) => {
      // Math.floor((inw + 2 * padding - fw) / stride) + 1
      const x = (colIdx * stride) % (inw + padding) - padding

      const y = Math.floor(colIdx / outH) * stride - padding

      const ax = x + ox
      const ay = y + oy

      // cell needs to be added to pos ax, ay
      // need to make sure it is within range if not then ignore
      if (ax >= 0 && ax < inw && ay >= 0 && ay < inh) {
        inp[ay][ax] += cell
      }
      // console.log(colIdx)
      // console.log({x, y})
      // console.log({rowIdx, colIdx, ox, oy, x, y, ax, ay})
    })
    // console.log(rowIdx)
    // console.log(inp)
  })

  return inp
}

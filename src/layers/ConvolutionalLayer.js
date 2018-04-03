import Layer from "../Layer"
import invariant from 'invariant'
import { flatten } from '../utils'


function convolution(
  input,
  filter,
  {
    stride = 1,
    strideX,
    strideY,
    zeroPadding = 0,
    zeroPaddingX,
    zeroPaddingY
  } = {}
) {
  const inW = input.width;
  const inH = input.height;

  if (!zeroPaddingX) zeroPaddingX = zeroPadding;
  if (!zeroPaddingY) zeroPaddingY = zeroPadding;

  if (!strideX) strideX = stride;
  if (!strideY) strideY = stride;

  const filterW = filter.width;
  const filterH = filter.height;

  let out = [];

  function get(x, y) {
    if (x < 0 || x >= inW || y < 0 || y >= inH) return 0;
    return input.get(x, y);
  }

  for (let y = -zeroPaddingY; y <= inH + zeroPaddingY - filterH; y += strideY) {
    for (
      let x = -zeroPaddingX;
      x <= inW + zeroPaddingX - filterW;
      x += strideX
    ) {
      let finalVal = 0;
      for (let fy = 0; fy < filterH; fy++) {
        for (let fx = 0; fx < filterW; fx++) {
          const fIdx = fy * filterW + fx;
          const fVal = filter.get(fx, fy);

          const ax = x + fx;
          const ay = y + fy;
          const val = get(ax, ay);

          finalVal += val * fVal;
        }
      }
      out.push(finalVal);
    }
  }

  return out;
}


class Matrix {
  constructor(w, h, data) {
    this.width = w;
    this.height = h;
    if (!data) data = new Array(w * h).fill(0);
    else if (typeof data === "function") {
      data = new Array(w * h).fill(0).map((_, i) => data(this.toCoords(i)));
    }
    this.data = data;
  }

  set data(val) {
    invariant(val.length === this.size, "data does not fit in matrix");
    this._data = val;
  }
  get data() {
    return this._data;
  }

  get size() {
    return this.width * this.height;
  }

  toIndex(x, y) {
    invariant(x >= 0 && x < this.width, "x out of bounds");
    invariant(y >= 0 && y < this.height, "y out of bounds");
    return y * this.width + x;
  }

  toCoords(i) {
    let x = i % this.width;
    let y = (i - x) / this.width;
    return { x, y };
  }

  get(x, y) {
    const idx = this.toIndex(x, y);
    return this.data[idx];
  }

  set(x, y, val) {
    const idx = this.toIndex(x, y);
    this.data[idx] = val;
  }

  forEach(cb) {
    this.data.map((val, i) => {
      const coords = this.toCoords(i);
      coords.index = i;
      return cb(val, coords, this);
    });
  }

  map(cb) {
    const newMatrix = new Matrix(this.width, this.height);
    newMatrix._data = this.data.map((val, i) => {
      const coords = this.toCoords(i);
      coords.index = i;
      return cb(val, coords, this);
    });
    return newMatrix;
  }

  spread(amountX, amountY = amountX) {
    invariant(amountX > 0 && amountY > 0, "spread amount must tbe positive");
    const newWidth = amountX * (this.width - 1) + 1;
    const newHeight = amountY * (this.height - 1) + 1;
    const newMatrix = new Matrix(newWidth, newHeight);
    this.forEach((val, { x, y }) => {
      const ax = x * amountX;
      const ay = y * amountY;
      newMatrix.set(ax, ay, val);
    });
    return newMatrix;
  }

  rotate() {
    const newMatrix = new Matrix(this.width, this.height)
    newMatrix.data = this.data.reverse()
    return newMatrix
  }

  flatten() {
    return this.data
  }
}

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
   * @param  {number} [params.stride=1] - stride length
   * @param  {number} [params.strideX] - stride length x
   * @param  {number} [params.strideY] - stride length y
   * @param  {number} [params.filterSize=2] - size of filter
   * @param  {number} [params.filterW] - size of filter w
   * @param  {number} [params.filterH] - size of filter
   * @param  {number} [filters=8] - number of filters to use
   * @param  {number} [zeroPadding=0] - padding to be applied before convolutions
   */
  constructor({
    inW,
    inH,
    inD,
    stride = 1,
    strideX,
    strideY,
    filterSize = 2,
    filterW,
    filterH,
    filters: filterCount = 8,
    zeroPadding = 0,
    zeroPaddingX,
    zeroPaddingY,
    ...unknownOptions,
  }) {
    super()

    invariant(
      inW !== undefined && inH !== undefined && inD !== undefined,
      "must specify inW, inH and inD"
    );
    invariant(
      Object.keys(unknownOptions).length === 0,
      `Unknown options: ${Object.keys(unknownOptions)}`
    );


    this.strideX = strideX || stride;
    this.strideY = strideY || stride;

    this.filterW = filterW || filterSize;
    this.filterH = filterH || filterSize;
    this.filterCount = filterCount;

    this.zeroPaddingX = zeroPaddingX || zeroPadding;
    this.zeroPaddingY = zeroPaddingY || zeroPadding;

    this.inW = inW;
    this.inH = inH;
    this.inD = inD;

    this.outW =
      (this.inW + 2 * this.zeroPaddingX - this.filterW) / this.strideX + 1;
    this.outH =
      (this.inH + 2 * this.zeroPaddingY - this.filterH) / this.strideY + 1;
    this.outD = filterCount;

    invariant(
      this.outW % 1 === 0 && this.outH % 1 === 0,
      "non integer output size"
    );


    this.filters = Array(this.filterCount)
      .fill(null)
      .map(() => {
        //1 matrix per input layer
        return Array(this.inD).fill(null)
          .map(
            () =>
              new Matrix(this.filterW, this.filterH, () => Math.random() - 0.5)
          );
      });

  }

  // splits an array in n number of chunks
  // ([1,2,3,4], 2) => [[1,2], [3,4]]
  chunkInto(arr, n) {
    invariant(arr.length % n === 0, "can't evenly chunk");
    let chunkSize = arr.length / n;
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArr.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArr;
  }

  // converts an array into a volume
  // returns an array of matrices, each matrix is a layer and of size w, h
  volumize(w, h, d, arr) {
    invariant(w * h * d === arr.length, "invalid volume length");
    return this.chunkInto(arr, d).map(data => new Matrix(w, h, data));
  }


  /** @inheritdoc */
  getOutput(activation) {
    activation.output = activation.input.map(input => {
      // for each input split it into layers
      // each layer gets its own filter matrx
      const inputVolume = this.volumize(this.inW, this.inH, this.inD, input);

      // for each set of filters
      const eachFilterOutput = this.filters.map(filterVolume => {
        const convolvedLayers = inputVolume.map((layer, depth) => {
          const filter = filterVolume[depth];
          return convolution(layer, filter, {
            strideX: this.strideX,
            strideY: this.strideY,
            zeroPaddingX: this.zeroPaddingX,
            zeroPaddingY: this.zeroPaddingY
          });
        });
        return convolvedLayers[0].map((_, i) =>
          convolvedLayers.reduce((acc, x) => acc + x[i], 0)
        );
      });
      return flatten(eachFilterOutput);
    });
  }

  /** @inheritdoc */
  getInputGradient(activation) {
    activation.inputGradient = activation.outputGradient.map(outputGradient => {
      invariant(this.outW * this.outH * this.outD === outputGradient.length, 'incorrect output gradient size')

      const outputGradientVolume = this.volumize(
        this.outW,
        this.outH,
        this.outD,
        outputGradient
      ); // each layer is one filterSet

      const inputGradientVolume = outputGradientVolume.map((outputGradient, i) => {
        const filterVolume = this.filters[i]

        const reverseZPaddingX = this.filterW - this.zeroPaddingX - 1
        const reverseZPaddingY = this.filterH - this.zeroPaddingY - 1
        const spreadOutGrad = outputGradient.spread(this.strideX, this.strideY)
        //may need to loop oer filter set

        const inputGradients = filterVolume.map(filter => {
          const rotatedFilter = filter.rotate()
          return convolution(spreadOutGrad, rotatedFilter, { zeroPaddingX: reverseZPaddingX, zeroPaddingY: reverseZPaddingY })
        })

        return flatten(inputGradients)
      })

      return flatten(inputGradientVolume)

    })
  }

  /** @inheritdoc */
  getParamGrads(activation) {
    activation.paramGrads = activation.outputGradient.map((outputGradient, i) => {
      const inputVolume = this.volumize(this.inW, this.inH, this.inD, activation.input[i]); //each input layer
      const outputGradientVolume = this.volumize(
        this.outW,
        this.outH,
        this.outD,
        outputGradient
      ); // each layer is a filterVolume


      const filterGrads = outputGradientVolume.map((outputGradient, i) => {
        // for each output layer map over all inputs to generate the filter grads
        const spreadOutGrad = outputGradient.spread(this.strideX, this.strideY);

        const x = inputVolume.map(input => {
          return convolution(input, spreadOutGrad, { zeroPaddingX: this.zeroPaddingX, zeroPaddingY: this.zeroPaddingY, stride:1 });

        })

        // return x
        return flatten(x)

      })
      // return filterGrads;
      return flatten(filterGrads);
    });
  }

  /** @inheritdoc */
  getParams() {
    //TODO
    // console.log(flatten(flatten(this.filters)).map(mat => mat.flatten()))
    // debugger
    return flatten(flatten(flatten(this.filters)).map(mat => mat.flatten()))
  }

  /** @inheritdoc */
  setParams(val) {
    this.filters = this.chunkInto(val, this.filterCount).map(arr => {
      return this.chunkInto(arr, this.inD).map(arr => {
        return new Matrix(this.filterW, this.filterH, arr)
      })
    })
  }


  /** @inheritdoc */
  toJSON() {
    return {
      inW: this.inW,
      inH: this.inH,
      inD: this.inD,
      strideX: this.strideX,
      strideY: this.strideY,
      filterW: this.filterW,
      filterH: this.filterH,
      filterCount: this.filterCount,
      zeroPaddingX: this.zeroPaddingX,
      zeroPaddingY: this.zeroPaddingY,
      params: this.getParams()
    }
  }

  /** @inheritdoc */
  static fromJSON(json) {
    const { params, ...args } = json
    const layer = new this(args)
    layer.setParams(params)
    return layer
  }
}


// import Activation from '../Activation'


// const conv = new ConvolutionalLayer({
//   inW: 5,
//   inH: 5,
//   inD: 3,
//   stride: 2,
//   zeroPadding: 1,
//   filters: 1,
//   filterSize: 3
// });

// const activation = {
//   input: [
//     [
//       1,0,0,0,2,
//       0,0,0,2,2,
//       2,0,0,2,1,
//       2,2,2,1,2,
//       1,1,1,0,1,

//       0,2,2,2,2,
//       1,0,1,2,0,
//       1,0,0,1,2,
//       0,0,0,2,2,
//       0,1,0,2,1,

//       0,0,1,0,0,
//       2,0,2,1,2,
//       1,2,2,1,2,
//       2,1,2,2,0,
//       0,2,2,2,2
//     ]
//   ],

// };
// conv.filters[0][0].data = [0,-1,-1,1,-1,1,-1,0,0]
// conv.filters[0][1].data = [-1,-1,1,0,-1,1,1,1,0]
// conv.filters[0][2].data = [1,0,-1,-1,-1,-1,1,-1,1]

// // conv.filters[1][0].data = [1,-1,0,0,-1,-1,-1,-1,0]
// // conv.filters[1][1].data = [0,0,1,-1,0,-1,1,0,0]
// // conv.filters[1][2].data = [-1,1,-1,1,-1,0,-1,0,-1]


// conv.getOutput(activation);

// activation.outputGradient = [
//   [1,0,2,-1,0,0,1,2,2],
// ]

// conv.getInputGradient(activation)
// console.log(activation);


// throw 'stop'

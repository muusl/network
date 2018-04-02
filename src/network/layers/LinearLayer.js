import Layer from "../Layer"
import Matrix from "../Matrix"
import { arrayAdd } from "../utils"

/**
 * Linear layer
 * basic fully connected layer
 * @extends Layer
 */
export default class LinearLayer extends Layer {
  type = "linear"

  /**
   * @param  {Object} params
   * @param  {number} params.inpSize - number of inputs
   * @param  {number} params.outSize - number of outputs
   */
  constructor(inpSize, outSize) {
    super()
    this.in = inpSize
    this.out = outSize
    if (inpSize) {
      this.w = Matrix.create(inpSize, outSize, () => Math.random() - 0.5)
      this.b = Array(outSize).fill(0)
    }
  }

  /** @inheritdoc */
  getOutput(activation) {
    const { input } = activation
    activation.output = Matrix.dot(input, this.w).map(row =>
      arrayAdd(row, this.b)
    )
  }

  /** @inheritdoc */
  getInputGradient(activation) {
    activation.inputGradient = Matrix.dot(
      activation.outputGradient,
      Matrix.transpose(this.w)
    )
  }

  /** @inheritdoc */
  getParams() {
    return Matrix.flatten(this.w.concat([this.b]))
  }

  /** @inheritdoc */
  setParams(val) {
    const w = val.slice(0, val.length - this.out)
    this.w = Matrix.inflate(w, this.in, this.out)
    this.b = val.slice(val.length - this.out)
  }

  /** @inheritdoc */
  getParamGrads(activation) {
    // """Return a list of gradients over the parameters."""
    const JW = Matrix.dot(
      Matrix.transpose(activation.input),
      activation.outputGradient
    )
    // quicker to add column wise then to dot product with inputs of all 1's
    const Jb = activation.outputGradient.reduce((acc, row) =>
      arrayAdd(acc, row)
    )
    activation.paramGrads = Matrix.flatten(
      Matrix.map(JW.concat([Jb]), el => el / activation.input.length)
    )
  }

  /** @inheritdoc */
  toJSON() {
    return {
      w: this.w,
      b: this.b,
    }
  }

  /** @inheritdoc */
  static fromJSON(json) {
    const { w, b } = json
    const layer = new this()
    layer.w = w
    layer.b = b
    return layer
  }
}

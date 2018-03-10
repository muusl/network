import Layer from "./Layer"
import Matrix from "./Matrix"

export default class SigmoidLayer extends Layer {
  type = "softmax"

  getOutput(activation) {
    const inpExp = Matrix.map(activation.input, x => Math.exp(x))
    const sums = inpExp.map(row => row.reduce((a = 0, b = 0) => a + b))
    activation.output = Matrix.map(inpExp, (inp, x, y) => Math.round(1000 * inp / sums[y]) / 1000)
  }

  getInputGradient(activation) {
    const { outputGradient, output } = activation
    activation.inputGradient = Matrix.map(outputGradient, grad => grad / output[0].length)
  }
}

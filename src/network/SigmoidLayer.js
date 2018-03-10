import Layer from "./Layer"
import Matrix from "./Matrix"

export default class SigmoidLayer extends Layer {
  type = "sigmoid"

  f = x => 1 / (1 + Math.exp(-x))
  fPrime = x => x * (1 - x)

  getOutput(activation) {
    activation.output = Matrix.map(activation.input, this.f)
  }

  getInputGradient(activation) {
    activation.inputGradient = Matrix.multiply(
      Matrix.map(activation.output, this.fPrime),
      activation.outputGradient,
    )
  }
}

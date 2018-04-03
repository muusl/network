import Layer from "../Layer";
import Matrix from "../Matrix";

/**
 * Softmax activation layer
 * @extends Layer
 */
export default class SigmoidLayer extends Layer {
  type = "sigmoid";

  /**
   * @param  {number} x
   * @returns {number} sigmoid of x
   */
  f = x => 1 / (1 + Math.exp(-x));

  /**
   * @param  {number} x
   * @returns {number} differential sigmoid of x
   */
  fPrime = x => x * (1 - x);

  /** @inheritdoc */
  getOutput(activation) {
    activation.output = Matrix.map(activation.input, this.f);
  }

  /** @inheritdoc */
  getInputGradient(activation) {
    activation.inputGradient = Matrix.multiply(
      Matrix.map(activation.output, this.fPrime),
      activation.outputGradient
    );
  }
}

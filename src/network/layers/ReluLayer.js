import Layer from "../Layer";
import Matrix from "../Matrix";

/**
 * Relu activation layer
 * @extends Layer
 */
export default class ReluLayer extends Layer {
  type = "relu";

  /**
   * @param  {number} x
   * @returns {number} max of [0, x]
   */
  f = x => Math.max(0, x);

  /**
   * @param  {number} x
   * @returns {number} differential of relu?
   */
  fPrime = x => (x > 0 ? 1 : 0);

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

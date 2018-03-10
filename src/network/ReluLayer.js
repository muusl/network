import Layer from "./Layer";
import Matrix from "./Matrix";

export default class ReluLayer extends Layer {
  type = "sigmoid";

  f = x => Math.max(0, x);
  fPrime = x => (x > 0 ? 1 : 0);

  getOutput(activation) {
    activation.output = Matrix.map(activation.input, this.f);
  }

  getInputGradient(activation) {
    activation.inputGradient = Matrix.multiply(
      Matrix.map(activation.output, this.fPrime),
      activation.outputGradient
    );
  }
}

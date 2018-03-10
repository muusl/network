import Layer from "./Layer";
import Matrix from "./Matrix";
import { arrayAdd } from "./utils";

export default class LinearLayer extends Layer {
  type = "linear";

  constructor(inpSize, outSize) {
    super();
    this.in = inpSize;
    this.out = outSize;
    if (inpSize) {
      this.w = Matrix.create(inpSize, outSize, () => Math.random() - 0.5);
      this.b = Array(outSize).fill(0);
    }
  }

  getOutput(activation) {
    const { input } = activation;
    activation.output = Matrix.dot(input, this.w).map(row =>
      arrayAdd(row, this.b)
    );
  }

  getInputGradient(activation) {
    activation.inputGradient = Matrix.dot(
      activation.outputGradient,
      Matrix.transpose(this.w)
    );
  }

  getParams() {
    return Matrix.flatten(this.w.concat([this.b]));
  }

  setParams(val) {
    const w = val.slice(0, val.length - this.out);
    this.w = Matrix.inflate(w, this.in, this.out);
    this.b = val.slice(val.length - this.out);
  }

  getParamGrads(activation) {
    // """Return a list of gradients over the parameters."""
    const JW = Matrix.dot(
      Matrix.transpose(activation.input),
      activation.outputGradient
    );
    // quicker to add column wise then to dot product with inputs of all 1's
    const Jb = activation.outputGradient.reduce((acc, row) =>
      arrayAdd(acc, row)
    );

    activation.paramGrads = Matrix.flatten(
      Matrix.map(JW.concat([Jb]), el => el / activation.input.length)
    );
  }

  toJSON() {
    return {
      w: this.w,
      b: this.b
    };
  }

  static fromJSON(json) {
    const { w, b } = json;
    const layer = new this();
    layer.w = w;
    layer.b = b;
    return layer;
  }
}

// nb_samples_gradientcheck = 10 # Test the gradients on a subset of the data
// X_temp = X_train[0:nb_samples_gradientcheck,:]
// T_temp = T_train[0:nb_samples_gradientcheck,:]
// # Get the parameter gradients with backpropagation
// activations = forward_step(X_temp, layers)
// param_grads = backward_step(activations, T_temp, layers)

// # Set the small change to compute the numerical gradient
// eps = 1e-4
// # Compute the numerical gradients of the parameters in all layers.
// for idx in range(len(layers)):
//     layer = layers[idx]
//     layer_backprop_grads = param_grads[idx]
//     # Compute the numerical gradient for each parameter in the layer
//     for p_idx, param in enumerate(layer.get_params_iter()):
//         grad_backprop = layer_backprop_grads[p_idx]
//         # + eps
//         param += eps
//         plus_cost = layers[-1].get_cost(forward_step(X_temp, layers)[-1], T_temp)
//         # - eps
//         param -= 2 * eps
//         min_cost = layers[-1].get_cost(forward_step(X_temp, layers)[-1], T_temp)
//         # reset param value
//         param += eps
//         # calculate numerical gradient
//         grad_num = (plus_cost - min_cost)/(2*eps)
//         # Raise error if the numerical grade is not close to the backprop gradient
//         if not np.isclose(grad_num, grad_backprop):
//             raise ValueError('Numerical gradient of {:.6f} is not close to the backpropagation gradient of {:.6f}!'.format(float(grad_num), float(grad_backprop)))
// print('No gradient errors found')

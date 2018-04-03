/**
 * Layer
 * Abstract layer which provides ground work for all further layers
 * Usable layers will extend this class and override certain functions
 * For instance a SigmoidLayer will override the getOutput function in order to
 * manipulate the data before passing it forward
 */
export default class Layer {
  /**
   * calculates and sets the output of the activation
   * @param  {Activation} activation
   * @param  {number[][]} activation.input
   */
  getOutput(activation) {
    activation.output = activation.input;
  }

  /**
   * pass input backwards using the differential of the activation function
   * usally means passing the outputGradient back along the weights
   * sets the activation.inputGradient property
   * @param  {Activation} activation
   * @param  {number[][]} activation.outputGradient
   */
  getInputGradient(activation) {
    return (activation.inputGradient = []);
  }
  /**
   * @returns {number[]} weights to be adjusted
   */
  getParams() {
    return null;
  }
  /**
   * @param {number[]} newParams - new paramaeters for the layer, in the same order
   * as returned from .getParams()
   */
  setParams(newParams) {}

  /**
   * calculates the error over the params and sets the result on activation.paramGrads
   * this usally mean multiplying the input by the output gradient
   * @param  {Activation} activation - for this layer
   */
  getParamGrads(activation) {
    activation.paramGrads = [];
  }

  /**
   * serializes all data necessary to restore the layer at a later time
   * used for saving the layer to file
   */
  toJSON() {
    return {};
  }

  /**
   * revereses the serialization of .toJSON
   * @param  {Object} json
   * @returns {Layer} returns instantiated layer with the same config
   */
  static fromJSON(json) {
    return new this();
  }
}

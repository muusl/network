export default class Layer {
  // pass input forward through the layer
  getOutput(activation) {
    activation.output = activation.input
  }

  // pass input backwards using the differential of the activation function
  getInputGradient(activation) {
    return (activation.inputGradient = [])
  }

  getParams() {
    return null
  }
  setParams() {}

  getParamGrads(activation) {
    activation.paramGrads = []
  }

  toJSON() {
    return {}
  }

  fromJSON(json) {
    return new this()
  }
}

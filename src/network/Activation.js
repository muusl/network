export default class Activation {
  grads = []
  paramGrads = []

  /**
   * returns the input for this activation
   * if one has been set then it will return that else it returns the previous
   * layers output
   */
  get input() {
    return this._input ? this._input : this.previous.output
  }

  /**
   * sets the input to this layer
   * @param  {number[][]} val - input value
   */
  set input(val) {
    this._input = val
  }

  // get output() {
  //   if (!this._output) {
  //     this.layer.getOutput(this)
  //   }
  //   return this._output
  // }
  // set output(value) {
  //   this._output = value
  // }

  /**
   * returns the output gradient for this activation
   * if one has been set then that will be returned
   * otherwise it defaults to the next layerers input gradient
   */
  get outputGradient() {
    return this._outputGradient || this.next.inputGradient
  }

  /**
   * sets the output gradient
   * used at the last layer to set the final error
   * @param  {number[][]} val - output gradient
   */
  set outputGradient(val) {
    this._outputGradient = val
  }

  /**
   * creates a new activation and sets it up as the next in the chain
   * @returns {Activation}
   */
  createNext() {
    this.next = new this.constructor()
    this.next.previous = this
    return this.next
  }

  toJSON() {
    return {
      input: this.input,
      output: this.output,
      layerType: this.layer.type,
    }
  }
}

export default class Activation {
  // output = []
  grads = []
  paramGrads = []

  get input() {
    return this._input ? this._input : this.previous.output
  }
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

  get outputGradient() {
    return this._outputGradient || this.next.inputGradient
  }

  set outputGradient(val) {
    this._outputGradient = val
  }

  createNext() {
    const next = new this.constructor()
    this.next = next
    next.previous = this
    return next
  }
}

import Matrix from "./Matrix"
import invariant from "invariant"
import Activation from "./Activation"
import { arrayAdd, arraySub } from "./utils"
import Output from "./Output"

export default class Network {
  static layerTypes = {
    linear: require("./layers/LinearLayer").default,
    pooling: require("./layers/PoolingLayer").default,
    convolutional: require("./layers/ConvolutionalLayer").default,
    sigmoid: require("./layers/SigmoidLayer").default,
    relu: require("./layers/ReluLayer").default,
    softmax: require("./layers/SoftmaxLayer").default,
  }
  //whoa!!!!!
  layers = []

  addLayer(layerOrName, args = []) {
    if (typeof layerOrName === "string") {
      const cls = this.constructor.layerTypes[layerOrName]
      invariant(cls !== undefined, `unknwon layer type ${layerOrName}`)
      if (!Array.isArray(args)) args = [args]
      const layer = new cls(...args)
      this.layers.push(layer)
      return layer
    } else {
      this.layers.push(layerOrName)
      return layerOrName
    }
  }

  forward(input) {
    const activations = []

    this.layers.forEach((layer, i) => {
      let activation
      if (i === 0) {
        activation = new Activation()
        activation.input = input
      } else {
        activation = activations[activations.length - 1].createNext()
      }
      activation.layer = layer
      activations.push(activation)

      layer.getOutput(activation)
    })
    return activations
  }

  classify(input) {
    let single = !Array.isArray(input[0])
    if (single) input = [input]
    const activations = this.forward(input)
    const { output } = activations[activations.length - 1]
    return single ? output[0] : output
  }

  backErrors(activations, expected) {
    // calculate the cost
    const cost = Matrix.sub(
      expected,
      activations[activations.length - 1].output
    )
    activations[activations.length - 1].outputGradient = cost

    let currentActivation = activations[activations.length - 1]
    while (currentActivation) {
      currentActivation.layer.getParamGrads(currentActivation)
      currentActivation.layer.getInputGradient(currentActivation)
      currentActivation = currentActivation.previous
    }
  }

  train(
    input,
    expected,
    {
      batchSize,
      noOfIterations = 300,
      learningRate = 0.1,
      momentum = 0,
      onStep = () => {},
    } = {}
  ) {
    invariant(momentum < 1, "momentum cant be greater then 1")

    let batched = false
    if (batchSize && batchSize < input.length) {
      batched = true
      const noOfBatches = Math.ceil(input.length / batchSize)
    }

    const trainingRound = (inp, exp) => {
      const activations = this.forward(inp)
      this.backErrors(activations, exp)

      this.layers.forEach((layer, idx) => {
        const params = layer.getParams()
        // if there are no params on the layer then why bother
        if (!params) return

        let paramDeltas = activations[idx].paramGrads

        if (Array.isArray(paramDeltas[0])) {
          //average delta accross each input
          const numberGrads = paramDeltas.length
          paramDeltas = paramDeltas
            .reduce((acc, x) => arrayAdd(acc, x))
            .map(a => a / numberGrads)
        }

        paramDeltas = paramDeltas.map(v => v * learningRate)

        if (momentum) {
          if (layer.lastUpdate) {
            const momentumDeltas = layer.lastUpdate.map(x => x * momentum)
            paramDeltas = arrayAdd(paramDeltas, momentumDeltas)
          }

          layer.lastUpdate = paramDeltas
        }

        let newParams = arrayAdd(params, paramDeltas)

        if (newParams.some(el => el !== el)) debugger

        layer.setParams(newParams)
      })
    }

    const shuffleInputAndExpected = () => {
      let arrEnd = input.length
      while (arrEnd) {
        const idx = Math.floor(Math.random() * arrEnd--)

        let temp
        temp = input[arrEnd]
        input[arrEnd] = input[idx]
        input[idx] = temp

        temp = expected[arrEnd]
        expected[arrEnd] = expected[idx]
        expected[idx] = temp
      }
    }

    if (batched) {
      for (let i = 0; i < noOfIterations; i++) {
        onStep(i)
        // console.time(`batch ${i + 1}`)
        shuffleInputAndExpected()
        let batchStartIndex = 0
        while (batchStartIndex < input.length) {
          const batchInputs = input.slice(
            batchStartIndex,
            batchStartIndex + batchSize
          )
          const batchExpected = expected.slice(
            batchStartIndex,
            batchStartIndex + batchSize
          )
          trainingRound(batchInputs, batchExpected)
          batchStartIndex += batchSize
        }
        // console.timeEnd(`batch ${i + 1}`)
      }
    } else {
      for (let i = 0; i < noOfIterations; i++) {
        onStep(i)
        trainingRound(input, expected)
      }
    }
    // this.saveNetwork("./backups/network-final");
  }

  saveNetwork(path) {
    const json = JSON.stringify(this.toJSON())
    require("fs").writeFile(path, json, err => {
      if (err) throw err
    })
  }

  static loadNetwork(path) {
    return new Promise((resolve, reject) => {
      require("fs").readFile(path, (err, data) => {
        if (err) return reject(err)
        const json = JSON.parse(data)
        const network = this.fromJSON(json)
        return network
      })
    })
  }

  toJSON() {
    return this.layers.map(layer => {
      const json = layer.toJSON()
      json.type = layer.type
      return json
    })
  }

  static fromJSON(json) {
    const network = new this()
    network.layers = json.map(({ type, ...layerJson }) => {
      return this.layerTypes[type].fromJSON(layerJson)
    })
    return network
  }
}

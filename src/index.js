// // Good Luck!

// IMPORT DATA FROM MNIST AND THEN SAVE TO FILE
// import mnist from "mnist";
// console.log(mnist);
// const { training, test } = mnist.set(800, 200);
// let data = `module.exports = `;
// data += JSON.stringify(test);
// import fs from "fs";
// fs.writeFile("./src/quick-data.js", d);
// const split = Math.floor(data.length * 0.75);
// data.forEach(({ input, output }, i) => {
//   const set = i < split ? trainingSet : testSet;
//   set.data.push(input);
//   set.labels.push(output);
// });
// let d = `module.exports = {
//   trainingSet: ${JSON.stringify(trainingSet)},
//   testSet: ${JSON.stringify(testSet)},
// }`;

// var jpeg = require("jpeg-js")
// var fs = require("fs")
// var jpegData = fs.readFileSync("/home/henry/Pictures/fish/2.jpg")
// var rawImageData = jpeg.decode(jpegData)
// console.log(rawImageData)
// debugger

const fs = require("fs")

function printImage(data, w, h) {
  const syms = [" ", ".", "-", ":", "=", "+", "x", "%", "#", "@", "\u2588"]
  const mx = Math.max.apply(null, data)
  const mn = Math.min.apply(null, data)
  const scale = x => (x - mn) / mx
  function getSym(col) {
    const idx = Math.floor(scale(col) / (1 / syms.length))
    return syms[idx] || syms[syms.length - 1]
  }
  for (let i = 0; i < h; i++) {
    console.log(
      "|",
      data
        .slice(i * w, (i + 1) * w)
        .map(getSym)
        .join(""),
      "|"
    )
  }
}

import { Network, Output } from "./network"
import { trainingSet, testSet } from "./quick-data"

// console.log(testSet.data.slice(0, 1))

// throw "asd"

// Creating the network
// const network = new Network()

// network.addLayer("convolutional", {
//   inW: 28,
//   inH: 28,
//   inD: 1,
//   filterSize: 3,
//   stride: 3,
//   filters: 8,
//   zeroPadding: 1,
// })
// network.addLayer("relu")
// network.addLayer("convolutional", {
//   inW: 10,
//   inH: 10,
//   inD: 8,
//   filterSize: 2,
//   stride: 2,
//   filters: 8,
// })
// network.addLayer("relu")
// network.addLayer("convolutional", {
//   inW: 5,
//   inH: 5,
//   inD: 8,
//   filterSize: 3,
//   stride: 2,
//   zeroPadding: 1,
//   filters: 8,
// })
// network.addLayer("relu")
// network.addLayer("linear", [3 * 3 * 8, 10])
// network.addLayer("softmax")
fs.readFile("./tmp/test1.json", (err, data) => {
  if (err) throw err
  const { network: networkJSON, id } = JSON.parse(data)
  const network = Network.fromJSON(networkJSON)

  const output = network.classify(testSet.data)
  const id2 = new Output(output, testSet.labels).rmse()

  console.log(id === id2 ? "SAME" : "DIFF")
})

debugger

// const output = network.classify(testSet.data)
// const id = new Output(output, testSet.labels).rmse()
// const json = { id, network: network.toJSON() }
// fs.writeFile("./tmp/test1.json", JSON.stringify(json))

// console.log(l.getParams())
// const _log = console.log
// console.log = () => {}
// network.train(testSet.data, testSet.labels, {
//   learningRate: 0.5,
//   momentum: 0.8,
//   onStep: i => {
//     // console.log = _log
//     console.timeEnd(i - 1)
//     // _log(i)
//     console.time(i)
//     // console.log = () => {}
//   },
//   noOfIterations: 5,
// })
// console.log = _log

// console.log(l.getParams())
// testSet.labels.slice(0, 1),
// beforeOut,
// afterOut,
// new Output(beforeOut, testSet.labels).percentage(),
// new Output(afterOut, testSet.labels).percentage(),

// import { render } from "./render"
// render(network, beforeOut)

// network.train(trainingSet.data.slice(0), trainingSet.labels.slice(0), {
//   onStep: i => console.log("step", i),
// })

// console.log("TESTING: ")
// const afterOut = network.classify(testSet.data)
// const output = new Output(afterOut, testSet.labels)
// // printImage(trainingSet.data[3], 28, 28);
// // console.log("ACTU:", trainingSet.labels.slice(0));
// // console.log("PRED:", out);
// console.log("before", new Output(beforeOut, testSet.labels).rmse())
// console.log("after", output.rmse())

// // throw "asdasd";

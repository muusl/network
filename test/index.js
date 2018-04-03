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
import { Network, Output } from "network"

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
const genres = [
  "blues",
  "country",
  "classical",
  "disco",
  "electronic",
  "hiphop",
  "jazz",
  "rock",
  "metal",
  "pop",
]
function oneHot(genre) {
  const arr = Array(10).fill(0)
  arr[genres.indexOf(genre)] = 1
  return arr
}

function genTrack(genre) {
  const idx = genres.indexOf(genre)
  let cls = Array(10).fill(0)
  cls = cls.map(() => Math.max(0, Math.random() * 0.4 - 0.3))
  cls[idx] = Math.random() * 0.2 + 0.8
  return cls
}
console.log(genTrack("hiphop"))

function getPerson(ratings, likes, hates) {}

const person = {
  data: [],
  labels: [],
}
Array(25)
  .fill(null)
  .forEach(() => {
    const t = genTrack("hiphop")
    person.data.push(t)
    person.labels.push([1])
  })

Array(50)
  .fill(null)
  .forEach(() => {
    const genre = ["rock", "blues", "country"][Math.floor(Math.random() * 3)]
    const t = genTrack(genre)
    person.data.push(t)
    person.labels.push([0])
  })

Array(25)
  .fill(null)
  .forEach(() => {
    const t = genTrack("pop")
    person.data.push(t)
    person.labels.push([-1])
  })

console.log(person)

const network = new Network()
network.addLayer("linear", [10, 10])
network.addLayer("relu")
network.addLayer("linear", [10, 10])
network.addLayer("relu")
network.addLayer("linear", [10, 1])
// network.addLayer("sigmoid")

network.train(person.data, person.labels, {
  noOfIterations: 500,
  learningRate: 0.5,
  momentum: 0.9,
  onStep: console.log,
})

const testData = {
  data: [],
  labels: [],
}

Array(20)
  .fill(null)
  .forEach(() => {
    const t = genTrack("hiphop")
    testData.data.push(t)
    testData.labels.push([1])
  })

Array(20)
  .fill(null)
  .forEach(() => {
    const genre = [
      "blues",
      "country",
      // "classical",
      // "disco",
      // "electronic",
      // "jazz",
      "rock",
      // "metal",
    ][Math.floor(Math.random() * 3)]
    const t = genTrack(genre)
    testData.data.push(t)
    testData.labels.push([0])
  })

Array(20)
  .fill(null)
  .forEach(() => {
    const t = genTrack("pop")
    testData.data.push(t)
    testData.labels.push([-1])
  })

const out = network.classify(testData.data)
const output = new Output(out, testData.labels)

console.log(output.rmse())
console.log(output.percentage())

const q = network.classify([oneHot("hiphop"), oneHot("pop"), oneHot("rock")])
console.log(q)

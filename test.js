const data = [[0, 0], [1, 0], [0, 1], [1, 1]]

const labels = [0, 1, 1, 0]

const sigmoid = x => 1 / (1 + Math.exp(-x))
const diff_sigmoid = x => x * (1 - x)
console.log(sigmoid(0.044))
//layer 1
let w1 = Math.random() - 0.5
let w2 = Math.random() - 0.5
let w3 = Math.random() - 0.5
let w4 = Math.random() - 0.5

//layer 2
let w5 = Math.random() - 0.5
let w6 = Math.random() - 0.5

function hidden1(inps) {
  return inps.map(([n1, n2]) => {
    return [n1 * w1 + n2 * w2, n1 * w3 + n2 * w4]
  })
}

function hidden2(inps) {
  return inps.map(([n1, n2]) => {
    return [n1 * w5 + n2 * w6]
  })
}

const network = data => {
  const acts = []
  acts.push(data)
  let o1 = hidden1(data)
  acts.push(o1)
  o1 = o1.map(x => x.map(sigmoid))
  acts.push(o1)
  let o2 = hidden2(o1)
  acts.push(o2)
  o2 = o2.map(x => x.map(sigmoid))
  acts.push(o2)
  return acts
}

let learningRate = 0.01

function train(inps, labs) {
  const a = network(inps)

  inps.forEach((_, i) => {
    const activs = a.map(x => x[i])
    const label = labs[i]
    let n5error = (label - activs[4][0]) * diff_sigmoid(activs[3][0])
    console.log(label, activs[4][0], activs[3][0])
    //

    w5 += learningRate * n5error * activs[2][0]
    w6 += learningRate * n5error * activs[2][1]

    let n3error = w5 * n5error * diff_sigmoid(activs[1][0])
    let n4error = w6 * n5error * diff_sigmoid(activs[1][1])
    //

    // w1 += learningRate * n3error * activs[0][0]
    // w2 += learningRate * n4error * activs[0][0]
    // w3 += learningRate * n3error * activs[0][1]
    // w4 += learningRate * n4error * activs[0][1]

    let n1error = diff_sigmoid(n3error * w1 + n4error * w2)
    let n2error = diff_sigmoid(n3error * w3 + n4error * w4)
  })
}

// console.log(labels.map((l, i) => (l - network(data)[2][i][0]) ** 2))
console.log(network(data))
console.log("---")
Array(1000)
  .fill(0)
  .forEach(() => train(data, labels))
console.log("---")
console.log(network(data))

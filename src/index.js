// // Good Luck!

import LinearLayer, { Network } from "./network";

let data = [];
let labels = [];

for (let i = 0; i < 100; i++) {
  data.push([0, 0, 0, 1]);
  labels.push([0, 0]);
  data.push([0, 0, 1, 0]);
  labels.push([0, 1]);
  data.push([0, 1, 0, 0]);
  labels.push([1, 0]);
  data.push([1, 0, 0, 0]);
  labels.push([1, 1]);
}

const network = new Network();
network.addLayer("linear", [4, 4]);
network.addLayer("relu");
network.addLayer("linear", [4, 4]);
network.addLayer("sigmoid");
network.addLayer("linear", [4, 2]);
network.addLayer("sigmoid");

network.train(data, labels, {
  learningRate: 1,
  onStep: console.log,
  noOfIterations: 500
  // batchSize: 4
});

validate(
  [[0, 0, 0, 1], [0, 0, 1, 0], [0, 1, 0, 0], [1, 0, 0, 0]],
  [[0, 0], [0, 1], [1, 0], [1, 1]]
);

function validate(data, labels) {
  const outs = network.classify(data);
  const costs = outs.map((out, i) => {
    const lab = labels[i];
    console.log({ out, lab });
    return out.map((o, i) => (o - lab[i]) ** 2);
  });
  const costs2 = costs.map(c => c.reduce((a = 0, b = 0) => a + b));
  console.log(outs);
  console.log(costs);
  console.log(costs2);
  console.log(costs2.reduce((a = 0, b = 0) => a + b) / costs2.length);
}

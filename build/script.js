(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * class to group all matrix functions
 */
var Matrix = function () {
  function Matrix() {
    _classCallCheck(this, Matrix);
  }

  _createClass(Matrix, null, [{
    key: "dot",

    /**
     * @param {number[][]} a
     * @param {number[][]} b
     * @returns {number[][]} the dot product of a and b
     */
    value: function dot(a, b) {
      return a.map(function (_, i) {
        return b[0].map(function (_, j) {
          return b.reduce(function (acc, _, k) {
            return acc + a[i][k] * b[k][j];
          }, 0);
        });
      });
    }

    /**
     * calls the function cb for every element in the matrix
     * cb gets passed the value at that position, the x and y coord and the matrix itself
     * the return value of the function is captured and a matrix of the same size
     *    containing these values is returned
     * @param  {number[][]} a
     * @param  {(val:number, x: number, y: number, a:number[][]):any=>{}} cb
     * @returns {any[][]}
     */

  }, {
    key: "map",
    value: function map(a, cb) {
      return a.map(function (row, y) {
        return row.map(function (cell, x) {
          return cb(cell, x, y, a);
        });
      });
    }

    /**
     * performs element-wise addition on a and b
     * @param  {number[][]} a
     * @param  {number[][]} b
     * @returns {number[][]} a+b
     */

  }, {
    key: "add",
    value: function add(a, b) {
      return Matrix.map(a, function (el, x, y) {
        return el + b[y][x];
      });
    }

    /**
     * performs element-wise subtraction on a and b
     * @param  {number[][]} a
     * @param  {number[][]} b
     * @returns {number[][]} a-b
     */

  }, {
    key: "sub",
    value: function sub(a, b) {
      return Matrix.map(a, function (el, x, y) {
        return el - b[y][x];
      });
    }

    /**
     * performs element-wise multiplication on a and b
     * @param  {number[][]} a
     * @param  {number[][]} b
     * @returns {number[][]} a*b
     */

  }, {
    key: "multiply",
    value: function multiply(a, b) {
      return Matrix.map(a, function (el, x, y) {
        return el * b[y][x];
      });
    }

    /**
     * performs element-wise division on a and b
     * @param  {number[][]} a
     * @param  {number[][]} b
     * @returns {number[][]} a/b
     */

  }, {
    key: "divide",
    value: function divide(a, b) {
      return Matrix.map(a, function (el, x, y) {
        return el / b[y][x];
      });
    }

    /**
     * @param  {number[][]} a
     * @returns {number[][]} transposed version of a
     */

  }, {
    key: "transpose",
    value: function transpose(a) {
      return a[0].map(function (_, x) {
        return a.map(function (_, y) {
          return a[y][x];
        });
      });
    }

    /**
     * flattens a matrix into a single array in the form of [ row | row| row ]
     * @param {number[][]} a
     * @returns {number[]}
     */

  }, {
    key: "flatten",
    value: function flatten(a) {
      return Array.prototype.concat.apply([], a);
    }

    /**
     * oppisite of .flatten
     * returns a 2d matrix given a single dimensional array and a desired dimension
     * @param {number[]} a
     * @param {number} rows
     * @param {number} cols
     * @returns {number[][]}
     * @throws {Error} if the dimension does not match the amount of data supplied
     */

  }, {
    key: "inflate",
    value: function inflate(a, rows, cols) {
      if (a.length !== rows * cols) throw new Error("incompatible sizes, length or array must match rows*cols");
      return Matrix.create(rows, cols, function (x, y) {
        return a[y * cols + x];
      });
    }

    /**
     * sums every element in the matrix
     * @param {number[][]} a
     * @returns {number}
     */

  }, {
    key: "sum",
    value: function sum(a) {
      return this.flatten(a).reduce(function () {
        var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        return a + b;
      });
    }

    /**
     * creates a matrix of size rows*cols
     * if initializer function is passed then it is invoked for every x, y coord
     *     and the result is placed at the position
     * @param  {number} rows
     * @param  {number} cols
     * @param  {(x:number, y:number):any=>{}} [initializer]
     * @returns {number[][]}
     */

  }, {
    key: "create",
    value: function create(rows, cols, initializer) {
      var mat = Array(rows).fill(null).map(function () {
        return Array(cols).fill(null);
      });

      if (initializer) {
        return Matrix.map(mat, function (_, x, y) {
          return initializer(x, y);
        });
      }
      return mat;
    }
  }]);

  return Matrix;
}();

exports.default = Matrix;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Layer
 * Abstract layer which provides ground work for all further layers
 * Usable layers will extend this class and override certain functions
 * For instance a SigmoidLayer will override the getOutput function in order to
 * manipulate the data before passing it forward
 */
var Layer = function () {
  function Layer() {
    _classCallCheck(this, Layer);
  }

  _createClass(Layer, [{
    key: "getOutput",

    /**
     * calculates and sets the output of the activation
     * @param  {Activation} activation
     * @param  {number[][]} activation.input
     */
    value: function getOutput(activation) {
      activation.output = activation.input;
    }

    /**
     * pass input backwards using the differential of the activation function
     * usally means passing the outputGradient back along the weights
     * sets the activation.inputGradient property
     * @param  {Activation} activation
     * @param  {number[][]} activation.outputGradient
     */

  }, {
    key: "getInputGradient",
    value: function getInputGradient(activation) {
      return activation.inputGradient = [];
    }
    /**
     * @returns {number[]} weights to be adjusted
     */

  }, {
    key: "getParams",
    value: function getParams() {
      return null;
    }
    /**
     * @param {number[]} newParams - new paramaeters for the layer, in the same order
     * as returned from .getParams()
     */

  }, {
    key: "setParams",
    value: function setParams(newParams) {}

    /**
     * calculates the error over the params and sets the result on activation.paramGrads
     * this usally mean multiplying the input by the output gradient
     * @param  {Activation} activation - for this layer
     */

  }, {
    key: "getParamGrads",
    value: function getParamGrads(activation) {
      activation.paramGrads = [];
    }

    /**
     * serializes all data necessary to restore the layer at a later time
     * used for saving the layer to file
     */

  }, {
    key: "toJSON",
    value: function toJSON() {
      return {};
    }

    /**
     * revereses the serialization of .toJSON
     * @param  {Object} json
     * @returns {Layer} returns instantiated layer with the same config
     */

  }], [{
    key: "fromJSON",
    value: function fromJSON(json) {
      return new this();
    }
  }]);

  return Layer;
}();

exports.default = Layer;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * returns a + b
 * performs element-wise addition if an array is passed
 * @param  {number[]|number} a
 * @param  {number[]|number} b
 * @returns {number[]|number}
 */
var arrayAdd = exports.arrayAdd = function arrayAdd(a, b) {
  var aArray = Array.isArray(a);
  var bArray = Array.isArray(b);
  if (aArray && bArray) {
    return a.map(function (aEl, i) {
      return aEl + b[i];
    });
  } else if (aArray) {
    return a.map(function (el) {
      return el + b;
    });
  } else if (bArray) {
    return b.map(function (el) {
      return a + el;
    });
  } else {
    return a + b;
  }
};

/**
 * returns a - b
 * performs element-wise subtraction if an array is passed
 * @param  {number[]|number} a
 * @param  {number[]|number} b
 * @returns {number[]|number}
 */
var arraySub = exports.arraySub = function arraySub(a, b) {
  var aArray = Array.isArray(a);
  var bArray = Array.isArray(b);
  if (aArray && bArray) {
    return a.map(function (aEl, i) {
      return aEl - b[i];
    });
  } else if (aArray) {
    return a.map(function (el) {
      return el - b;
    });
  } else if (bArray) {
    return b.map(function (el) {
      return a - el;
    });
  } else {
    return a - b;
  }
};

/**
 * returns a * b
 * performs element-wise multiplication if an array is passed
 * @param  {number[]|number} a
 * @param  {number[]|number} b
 * @returns {number[]|number}
 */
var arrayMultiply = exports.arrayMultiply = function arrayMultiply(a, b) {
  var aArray = Array.isArray(a);
  var bArray = Array.isArray(b);
  if (aArray && bArray) {
    return a.map(function (aEl, i) {
      return aEl * b[i];
    });
  } else if (aArray) {
    return a.map(function (el) {
      return el * b;
    });
  } else if (bArray) {
    return b.map(function (el) {
      return a * el;
    });
  } else {
    return a * b;
  }
};

/**
 * returns a / b
 * performs element-wise division if an array is passed
 * @param  {(number[]|number)} a
 * @param  {number[]|number} b
 * @returns {number[]|number}
 */
var arrayDivide = exports.arrayDivide = function arrayDivide(a, b) {
  var aArray = Array.isArray(a);
  var bArray = Array.isArray(b);
  if (aArray && bArray) {
    return a.map(function (aEl, i) {
      return aEl / b[i];
    });
  } else if (aArray) {
    return a.map(function (el) {
      return el / b;
    });
  } else if (bArray) {
    return b.map(function (el) {
      return a / el;
    });
  } else {
    return a / b;
  }
};

var arraySum = exports.arraySum = function arraySum(arr) {
  return arr.reduce(sum);
};

/**
 * creates an array of length n filled with `value`. if value is a function
 * then it will be invoked for each element and its return will be that elements
 * value.
 * @param  {number} n - length of the array
 * @param  {any|(index:number)=>any} value - default value or callback for each element
 * @returns {any[]}
 */
var createArray = exports.createArray = function createArray(n, value) {
  if (typeof value === "function") {
    return Array(n).fill(undefined).map(function (_, i) {
      return value(i);
    });
  } else {
    return Array(n).fill(value);
  }
};

/**
 * returns a+b
 * used primarily to find the sum of an array arr.reduce(sum)
 * @param  {} a=0
 * @param  {} b=0
 */
var sum = exports.sum = function sum() {
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return a + b;
};

var flatten = exports.flatten = function flatten(arr) {
  return Array.prototype.concat.apply([], arr);
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var NODE_ENV = process.env.NODE_ENV;

var invariant = function invariant(condition, format, a, b, c, d, e, f) {
  if (NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Matrix = __webpack_require__(0);

var _Matrix2 = _interopRequireDefault(_Matrix);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Output = function () {
  function Output(predicted, labels) {
    _classCallCheck(this, Output);

    this.predicted = predicted;
    this.labels = labels;
  }

  _createClass(Output, [{
    key: "avg",
    value: function avg(arr) {
      return arr.reduce(function (a, b) {
        return a + b;
      }, 0) / arr.length;
    }
  }, {
    key: "percentage",
    value: function percentage() {
      var errors = _Matrix2.default.divide(this.predicted, this.labels);
      // errors = Matrix.map(errors, Math.abs);
      // errors = Matrix.divide(errors, actual);
      var tot = 0;
      var cnt = 0;

      _Matrix2.default.map(errors, function (el, x, y) {
        if (el === Infinity) return;
        el *= 100;
        tot += el > 100 ? 200 - el : el;
        cnt++;
      });
      return tot / cnt;
    }
  }, {
    key: "rmse",
    value: function rmse() {
      var _this = this;

      return this.avg(this.predicted.map(function (ps, i) {
        var as = _this.labels[i];
        var x = _this.avg((0, _utils.arraySub)(ps, as).map(function (x) {
          return Math.pow(x, 2);
        }));
        return Math.pow(x, 0.5);
      }));
    }
  }, {
    key: "msre",
    value: function msre() {
      var _this2 = this;

      return this.avg(this.predicted.map(function (ps, i) {
        var as = _this2.labels[i];
        return _this2.avg((0, _utils.arrayDivide)((0, _utils.arraySub)(ps, as), as).map(function (x) {
          return Math.pow(x, 2);
        }));
      }));
    }
  }, {
    key: "ce",
    value: function ce() {
      var _this3 = this;

      return this.avg(this.predicted.map(function (ps, i) {
        var as = _this3.labels[i];

        var top = (0, _utils.arraySum)((0, _utils.arraySub)(ps, as).map(function (x) {
          return Math.pow(x, 2);
        }));
        var bottom = (0, _utils.arraySum)((0, _utils.arraySub)(as, _this3.avg(as)).map(function (x) {
          return Math.pow(x, 2);
        }));
        return 1 - top / bottom;
      }));
    }
  }, {
    key: "rsqr",
    value: function rsqr() {
      var _this4 = this;

      return this.avg(this.predicted.map(function (ps, i) {
        var as = _this4.labels[i];
        var top = (0, _utils.arraySum)((0, _utils.arrayMultiply)((0, _utils.arraySub)(as, _this4.avg(as)), (0, _utils.arraySub)(ps, _this4.avg(ps))));
        var bottom = Math.sqrt((0, _utils.arraySum)((0, _utils.arrayMultiply)((0, _utils.arraySub)(as, _this4.avg(as)).map(function (x) {
          return Math.pow(x, 2);
        }), (0, _utils.arraySub)(ps, _this4.avg(ps)).map(function (x) {
          return Math.pow(x, 2);
        }))));
        console.log({ top: top, bottom: bottom });
        return Math.pow(top / bottom, 2);
      }));
    }
  }, {
    key: "n",
    get: function get() {
      return this.predicted.length;
    }
  }]);

  return Output;
}();

exports.default = Output;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _network = __webpack_require__(7);

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

var fs = __webpack_require__(4);


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
var genres = ["blues", "country", "classical", "disco", "electronic", "hiphop", "jazz", "rock", "metal", "pop"];
function oneHot(genre) {
  var arr = Array(10).fill(0);
  arr[genres.indexOf(genre)] = 1;
  return arr;
}

function genTrack(genre) {
  var idx = genres.indexOf(genre);
  var cls = Array(10).fill(0);
  cls = cls.map(function () {
    return Math.max(0, Math.random() * 0.4 - 0.3);
  });
  cls[idx] = Math.random() * 0.2 + 0.8;
  return cls;
}
console.log(genTrack("hiphop"));

function getPerson(ratings, likes, hates) {}

var person = {
  data: [],
  labels: []
};
Array(25).fill(null).forEach(function () {
  var t = genTrack("hiphop");
  person.data.push(t);
  person.labels.push([1]);
});

Array(50).fill(null).forEach(function () {
  var genre = ["rock", "blues", "country"][Math.floor(Math.random() * 3)];
  var t = genTrack(genre);
  person.data.push(t);
  person.labels.push([0]);
});

Array(25).fill(null).forEach(function () {
  var t = genTrack("pop");
  person.data.push(t);
  person.labels.push([-1]);
});

console.log(person);

var network = new _network.Network();
network.addLayer("linear", [10, 10]);
network.addLayer("relu");
network.addLayer("linear", [10, 10]);
network.addLayer("relu");
network.addLayer("linear", [10, 1]);
// network.addLayer("sigmoid")

network.train(person.data, person.labels, {
  noOfIterations: 500,
  learningRate: 0.5,
  momentum: 0.9,
  onStep: console.log
});

var testData = {
  data: [],
  labels: []
};

Array(20).fill(null).forEach(function () {
  var t = genTrack("hiphop");
  testData.data.push(t);
  testData.labels.push([1]);
});

Array(20).fill(null).forEach(function () {
  var genre = ["blues", "country",
  // "classical",
  // "disco",
  // "electronic",
  // "jazz",
  "rock"][Math.floor(Math.random() * 3)];
  var t = genTrack(genre);
  testData.data.push(t);
  testData.labels.push([0]);
});

Array(20).fill(null).forEach(function () {
  var t = genTrack("pop");
  testData.data.push(t);
  testData.labels.push([-1]);
});

var out = network.classify(testData.data);
var output = new _network.Output(out, testData.labels);

console.log(output.rmse());
console.log(output.percentage());

var q = network.classify([oneHot("hiphop"), oneHot("pop"), oneHot("rock")]);
console.log(q);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Output = exports.Network = undefined;

var _Network = __webpack_require__(8);

Object.defineProperty(exports, "Network", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Network).default;
  }
});

var _Output = __webpack_require__(5);

Object.defineProperty(exports, "Output", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Output).default;
  }
});

var _Network2 = _interopRequireDefault(_Network);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('network', _Network2.default);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _Matrix = __webpack_require__(0);

var _Matrix2 = _interopRequireDefault(_Matrix);

var _invariant = __webpack_require__(3);

var _invariant2 = _interopRequireDefault(_invariant);

var _Activation = __webpack_require__(9);

var _Activation2 = _interopRequireDefault(_Activation);

var _utils = __webpack_require__(2);

var _Output = __webpack_require__(5);

var _Output2 = _interopRequireDefault(_Output);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Network = (_temp = _class = function () {
  function Network() {
    _classCallCheck(this, Network);

    this.layers = [];
  }
  //whoa!!!!!


  _createClass(Network, [{
    key: "addLayer",
    value: function addLayer(layerOrName) {
      var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      if (typeof layerOrName === "string") {
        var cls = this.constructor.layerTypes[layerOrName];
        (0, _invariant2.default)(cls !== undefined, "unknwon layer type " + layerOrName);
        if (!Array.isArray(args)) args = [args];
        var layer = new (Function.prototype.bind.apply(cls, [null].concat(_toConsumableArray(args))))();
        this.layers.push(layer);
        return layer;
      } else {
        this.layers.push(layerOrName);
        return layerOrName;
      }
    }
  }, {
    key: "forward",
    value: function forward(input) {
      var activations = [];

      this.layers.forEach(function (layer, i) {
        var activation = void 0;
        if (i === 0) {
          activation = new _Activation2.default();
          activation.input = input;
        } else {
          activation = activations[activations.length - 1].createNext();
        }
        activation.layer = layer;
        activations.push(activation);

        layer.getOutput(activation);
      });
      return activations;
    }
  }, {
    key: "classify",
    value: function classify(input) {
      var single = !Array.isArray(input[0]);
      if (single) input = [input];
      var activations = this.forward(input);
      var output = activations[activations.length - 1].output;

      return single ? output[0] : output;
    }
  }, {
    key: "backErrors",
    value: function backErrors(activations, expected) {
      // calculate the cost
      var cost = _Matrix2.default.sub(expected, activations[activations.length - 1].output);
      activations[activations.length - 1].outputGradient = cost;

      var currentActivation = activations[activations.length - 1];
      while (currentActivation) {
        currentActivation.layer.getParamGrads(currentActivation);
        currentActivation.layer.getInputGradient(currentActivation);
        currentActivation = currentActivation.previous;
      }
    }
  }, {
    key: "train",
    value: function train(input, expected) {
      var _this = this;

      var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          batchSize = _ref.batchSize,
          _ref$noOfIterations = _ref.noOfIterations,
          noOfIterations = _ref$noOfIterations === undefined ? 300 : _ref$noOfIterations,
          _ref$learningRate = _ref.learningRate,
          learningRate = _ref$learningRate === undefined ? 0.1 : _ref$learningRate,
          _ref$momentum = _ref.momentum,
          momentum = _ref$momentum === undefined ? 0 : _ref$momentum,
          _ref$onStep = _ref.onStep,
          onStep = _ref$onStep === undefined ? function () {} : _ref$onStep;

      (0, _invariant2.default)(momentum < 1, "momentum cant be greater then 1");

      var batched = false;
      if (batchSize && batchSize < input.length) {
        batched = true;
        var noOfBatches = Math.ceil(input.length / batchSize);
      }

      var trainingRound = function trainingRound(inp, exp) {
        var activations = _this.forward(inp);
        _this.backErrors(activations, exp);

        _this.layers.forEach(function (layer, idx) {
          var params = layer.getParams();
          // if there are no params on the layer then why bother
          if (!params) return;

          var paramDeltas = activations[idx].paramGrads;

          if (Array.isArray(paramDeltas[0])) {
            //average delta accross each input
            var numberGrads = paramDeltas.length;
            paramDeltas = paramDeltas.reduce(function (acc, x) {
              return (0, _utils.arrayAdd)(acc, x);
            }).map(function (a) {
              return a / numberGrads;
            });
          }

          paramDeltas = paramDeltas.map(function (v) {
            return v * learningRate;
          });

          if (momentum) {
            if (layer.lastUpdate) {
              var momentumDeltas = layer.lastUpdate.map(function (x) {
                return x * momentum;
              });
              paramDeltas = (0, _utils.arrayAdd)(paramDeltas, momentumDeltas);
            }

            layer.lastUpdate = paramDeltas;
          }

          var newParams = (0, _utils.arrayAdd)(params, paramDeltas);

          if (newParams.some(function (el) {
            return el !== el;
          })) debugger;

          layer.setParams(newParams);
        });
      };

      var shuffleInputAndExpected = function shuffleInputAndExpected() {
        var arrEnd = input.length;
        while (arrEnd) {
          var idx = Math.floor(Math.random() * arrEnd--);

          var temp = void 0;
          temp = input[arrEnd];
          input[arrEnd] = input[idx];
          input[idx] = temp;

          temp = expected[arrEnd];
          expected[arrEnd] = expected[idx];
          expected[idx] = temp;
        }
      };

      if (batched) {
        for (var i = 0; i < noOfIterations; i++) {
          onStep(i);
          // console.time(`batch ${i + 1}`)
          shuffleInputAndExpected();
          var batchStartIndex = 0;
          while (batchStartIndex < input.length) {
            var batchInputs = input.slice(batchStartIndex, batchStartIndex + batchSize);
            var batchExpected = expected.slice(batchStartIndex, batchStartIndex + batchSize);
            trainingRound(batchInputs, batchExpected);
            batchStartIndex += batchSize;
          }
          // console.timeEnd(`batch ${i + 1}`)
        }
      } else {
        for (var _i = 0; _i < noOfIterations; _i++) {
          onStep(_i);
          trainingRound(input, expected);
        }
      }
      // this.saveNetwork("./backups/network-final");
    }
  }, {
    key: "saveNetwork",
    value: function saveNetwork(path) {
      var json = JSON.stringify(this.toJSON());
      __webpack_require__(4).writeFile(path, json, function (err) {
        if (err) throw err;
      });
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.layers.map(function (layer) {
        var json = layer.toJSON();
        json.type = layer.type;
        return json;
      });
    }
  }], [{
    key: "loadNetwork",
    value: function loadNetwork(path) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        __webpack_require__(4).readFile(path, function (err, data) {
          if (err) return reject(err);
          var json = JSON.parse(data);
          var network = _this2.fromJSON(json);
          return network;
        });
      });
    }
  }, {
    key: "fromJSON",
    value: function fromJSON(json) {
      var _this3 = this;

      var network = new this();
      network.layers = json.map(function (_ref2) {
        var type = _ref2.type,
            layerJson = _objectWithoutProperties(_ref2, ["type"]);

        return _this3.layerTypes[type].fromJSON(layerJson);
      });
      return network;
    }
  }]);

  return Network;
}(), _class.layerTypes = {
  linear: __webpack_require__(10).default,
  pooling: __webpack_require__(11).default,
  convolutional: __webpack_require__(12).default,
  sigmoid: __webpack_require__(13).default,
  relu: __webpack_require__(14).default,
  softmax: __webpack_require__(15).default }, _temp);
exports.default = Network;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Activation = function () {
  function Activation() {
    _classCallCheck(this, Activation);

    this.grads = [];
    this.paramGrads = [];
  }

  _createClass(Activation, [{
    key: "createNext",


    /**
     * creates a new activation and sets it up as the next in the chain
     * @returns {Activation}
     */
    value: function createNext() {
      this.next = new this.constructor();
      this.next.previous = this;
      return this.next;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        input: this.input,
        output: this.output,
        layerType: this.layer.type
      };
    }
  }, {
    key: "input",


    /**
     * returns the input for this activation
     * if one has been set then it will return that else it returns the previous
     * layers output
     */
    get: function get() {
      return this._input ? this._input : this.previous.output;
    }

    /**
     * sets the input to this layer
     * @param  {number[][]} val - input value
     */
    ,
    set: function set(val) {
      this._input = val;
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

  }, {
    key: "outputGradient",
    get: function get() {
      return this._outputGradient || this.next.inputGradient;
    }

    /**
     * sets the output gradient
     * used at the last layer to set the final error
     * @param  {number[][]} val - output gradient
     */
    ,
    set: function set(val) {
      this._outputGradient = val;
    }
  }]);

  return Activation;
}();

exports.default = Activation;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Layer2 = __webpack_require__(1);

var _Layer3 = _interopRequireDefault(_Layer2);

var _Matrix = __webpack_require__(0);

var _Matrix2 = _interopRequireDefault(_Matrix);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Linear layer
 * basic fully connected layer
 * @extends Layer
 */
var LinearLayer = function (_Layer) {
  _inherits(LinearLayer, _Layer);

  /**
   * @param  {Object} params
   * @param  {number} params.inpSize - number of inputs
   * @param  {number} params.outSize - number of outputs
   */
  function LinearLayer(inpSize, outSize) {
    _classCallCheck(this, LinearLayer);

    var _this = _possibleConstructorReturn(this, (LinearLayer.__proto__ || Object.getPrototypeOf(LinearLayer)).call(this));

    _this.type = "linear";

    _this.in = inpSize;
    _this.out = outSize;
    if (inpSize) {
      _this.w = _Matrix2.default.create(inpSize, outSize, function () {
        return Math.random() - 0.5;
      });
      _this.b = Array(outSize).fill(0);
    }
    return _this;
  }

  /** @inheritdoc */


  _createClass(LinearLayer, [{
    key: "getOutput",
    value: function getOutput(activation) {
      var _this2 = this;

      var input = activation.input;

      activation.output = _Matrix2.default.dot(input, this.w).map(function (row) {
        return (0, _utils.arrayAdd)(row, _this2.b);
      });
    }

    /** @inheritdoc */

  }, {
    key: "getInputGradient",
    value: function getInputGradient(activation) {
      activation.inputGradient = _Matrix2.default.dot(activation.outputGradient, _Matrix2.default.transpose(this.w));
    }

    /** @inheritdoc */

  }, {
    key: "getParams",
    value: function getParams() {
      return _Matrix2.default.flatten(this.w.concat([this.b]));
    }

    /** @inheritdoc */

  }, {
    key: "setParams",
    value: function setParams(val) {
      var w = val.slice(0, val.length - this.out);
      this.w = _Matrix2.default.inflate(w, this.in, this.out);
      this.b = val.slice(val.length - this.out);
    }

    /** @inheritdoc */

  }, {
    key: "getParamGrads",
    value: function getParamGrads(activation) {
      // """Return a list of gradients over the parameters."""
      var JW = _Matrix2.default.dot(_Matrix2.default.transpose(activation.input), activation.outputGradient);
      // quicker to add column wise then to dot product with inputs of all 1's
      var Jb = activation.outputGradient.reduce(function (acc, row) {
        return (0, _utils.arrayAdd)(acc, row);
      });
      activation.paramGrads = _Matrix2.default.flatten(_Matrix2.default.map(JW.concat([Jb]), function (el) {
        return el / activation.input.length;
      }));
    }

    /** @inheritdoc */

  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        w: this.w,
        b: this.b
      };
    }

    /** @inheritdoc */

  }], [{
    key: "fromJSON",
    value: function fromJSON(json) {
      var w = json.w,
          b = json.b;

      var layer = new this();
      layer.w = w;
      layer.b = b;
      return layer;
    }
  }]);

  return LinearLayer;
}(_Layer3.default);

exports.default = LinearLayer;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Layer2 = __webpack_require__(1);

var _Layer3 = _interopRequireDefault(_Layer2);

var _Matrix = __webpack_require__(0);

var _Matrix2 = _interopRequireDefault(_Matrix);

var _utils = __webpack_require__(2);

var _invariant = __webpack_require__(3);

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Pooling layer
 * reduces the input size by taking the maximum value within the filterSize
 * sampling every stride steps
 * @extends Layer
 */
var PoolingLayer = function (_Layer) {
  _inherits(PoolingLayer, _Layer);

  /**
   * @param  {Object} params
   * @param  {number} params.inW - width of input
   * @param  {number} params.inH - height of input
   * @param  {number} params.stride=2 - size of step
   * @param  {number} params.filterSize=2 - size of pooling filter
   */
  function PoolingLayer(_ref) {
    var inW = _ref.inW,
        inH = _ref.inH,
        inD = _ref.inD,
        _ref$stride = _ref.stride,
        stride = _ref$stride === undefined ? 2 : _ref$stride,
        strideX = _ref.strideX,
        strideY = _ref.strideY,
        _ref$filterSize = _ref.filterSize,
        filterSize = _ref$filterSize === undefined ? 2 : _ref$filterSize,
        filterW = _ref.filterW,
        filterH = _ref.filterH,
        _ref$zeroPadding = _ref.zeroPadding,
        zeroPadding = _ref$zeroPadding === undefined ? 0 : _ref$zeroPadding,
        zeroPaddingX = _ref.zeroPaddingX,
        zeroPaddingY = _ref.zeroPaddingY;

    _classCallCheck(this, PoolingLayer);

    var _this = _possibleConstructorReturn(this, (PoolingLayer.__proto__ || Object.getPrototypeOf(PoolingLayer)).call(this));

    _this.type = "pooling";


    (0, _invariant2.default)(inW !== undefined && inH !== undefined && inD !== undefined, "must specify inW, inH, and inD");
    _this.inW = inW;
    _this.inH = inH;
    _this.inD = inD;
    _this.strideX = strideX || stride;
    _this.strideY = strideY || stride;
    _this.filterW = filterW || filterSize;
    _this.filterH = filterH || filterSize;
    _this.zeroPaddingX = zeroPaddingX || zeroPadding;
    _this.zeroPaddingY = zeroPaddingY || zeroPadding;
    return _this;
  }

  _createClass(PoolingLayer, [{
    key: "volumize",
    value: function volumize(data) {
      var area = this.inW * this.inH;
      return Array(this.inD).fill(null).map(function (_, i) {
        return data.slice(i * area, (i + 1) * area);
      });
    }

    /** @inheritdoc */

  }, {
    key: "getOutput",
    value: function getOutput(activation) {
      var _this2 = this;

      var inW = this.inW,
          inH = this.inH,
          zeroPaddingX = this.zeroPaddingX,
          zeroPaddingY = this.zeroPaddingY,
          strideX = this.strideX,
          strideY = this.strideY,
          filterW = this.filterW,
          filterH = this.filterH;

      activation.maxIndices = [];

      activation.output = activation.input.map(function (singleInputArr, inputIdx) {
        var input = _this2.volumize(singleInputArr);
        var maxIndices = [];
        var layerMaxes = input.map(function (layer, layerIdx) {
          var values = [];

          for (var y = -zeroPaddingY; y <= inH + zeroPaddingY - filterH; y += strideY) {
            for (var x = -zeroPaddingX; x <= inW + zeroPaddingX - filterW; x += strideX) {
              var maxValue = -Infinity;
              var maxIndex = null;
              for (var oy = 0; oy < filterW; oy++) {
                for (var ox = 0; ox < filterH; ox++) {
                  var ax = x + ox;
                  var ay = y + oy;

                  var val = void 0;
                  var idx = void 0;
                  var inZPadding = false;
                  if (ax < 0 || ax >= inW || ay < 0 || ay >= inH) {
                    inZPadding = true;
                    val = 0;
                  } else {
                    idx = ay * inW + ax;
                    val = layer[idx];
                  }

                  if (val > maxValue) {
                    maxValue = val;
                    maxIndex = inZPadding ? null : idx + layerIdx * inW * inH;
                  }
                }
              }
              values.push(maxValue);
              if (maxIndex !== null) maxIndices.push(maxIndex);
            }
          }

          return values;
        });

        activation.maxIndices[inputIdx] = (0, _utils.flatten)(maxIndices);
        return (0, _utils.flatten)(layerMaxes);
      });
    }

    /** @inheritdoc */

  }, {
    key: "getInputGradient",
    value: function getInputGradient(activation) {
      var _this3 = this;

      activation.inputGradient = activation.outputGradient.map(function (og, wi) {
        var inpGrad = Array(_this3.inW * _this3.inH * _this3.inD).fill(0);
        activation.maxIndices[wi].forEach(function (maxIdx, i) {
          inpGrad[maxIdx] += og[i];
        });
        return inpGrad;
      });
    }

    /** @inheritdoc */

  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        inW: this.inW,
        inH: this.inH,
        stride: this.stride,
        filterSize: this.filterSize
      };
    }

    /** @inheritdoc */

  }], [{
    key: "fromJSON",
    value: function fromJSON(json) {
      var inW = json.inW,
          inH = json.inH,
          stride = json.stride,
          filterSize = json.filterSize;

      return new this({ inW: inW, inH: inH, stride: stride, filterSize: filterSize });
    }
  }]);

  return PoolingLayer;
}(_Layer3.default);

// const layer = new PoolingLayer({
//   inW: 4,
//   inH: 4,
//   inD: 2,
//   zeroPadding: 0,
//   stride: 2,
//   filterSize: 2,
// })

// const activ = {
//   input: [
//     [
//       3,
//       1,
//       2,
//       4,
//       0,
//       2,
//       5,
//       1,
//       0,
//       0,
//       1,
//       3,
//       0,
//       0,
//       3,
//       3,
//       //l2
//       1,
//       2,
//       1,
//       2,
//       1,
//       3,
//       3,
//       2,
//       4,
//       1,
//       4,
//       5,
//       0,
//       0,
//       0,
//       0,
//     ],
//   ],
// }

// layer.getOutput(activ)

// activ.outputGradient = [[1, 1, 1, 1, 1, 1, 1, 1]]
// layer.getInputGradient(activ)
// console.log(activ)

// throw "pooling"


exports.default = PoolingLayer;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Layer2 = __webpack_require__(1);

var _Layer3 = _interopRequireDefault(_Layer2);

var _invariant = __webpack_require__(3);

var _invariant2 = _interopRequireDefault(_invariant);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function convolution(input, filter) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$stride = _ref.stride,
      stride = _ref$stride === undefined ? 1 : _ref$stride,
      strideX = _ref.strideX,
      strideY = _ref.strideY,
      _ref$zeroPadding = _ref.zeroPadding,
      zeroPadding = _ref$zeroPadding === undefined ? 0 : _ref$zeroPadding,
      zeroPaddingX = _ref.zeroPaddingX,
      zeroPaddingY = _ref.zeroPaddingY;

  var inW = input.width;
  var inH = input.height;

  if (!zeroPaddingX) zeroPaddingX = zeroPadding;
  if (!zeroPaddingY) zeroPaddingY = zeroPadding;

  if (!strideX) strideX = stride;
  if (!strideY) strideY = stride;

  var filterW = filter.width;
  var filterH = filter.height;

  var out = [];

  function get(x, y) {
    if (x < 0 || x >= inW || y < 0 || y >= inH) return 0;
    return input.get(x, y);
  }

  for (var y = -zeroPaddingY; y <= inH + zeroPaddingY - filterH; y += strideY) {
    for (var x = -zeroPaddingX; x <= inW + zeroPaddingX - filterW; x += strideX) {
      var finalVal = 0;
      for (var fy = 0; fy < filterH; fy++) {
        for (var fx = 0; fx < filterW; fx++) {
          var fIdx = fy * filterW + fx;
          var fVal = filter.get(fx, fy);

          var ax = x + fx;
          var ay = y + fy;
          var val = get(ax, ay);

          finalVal += val * fVal;
        }
      }
      out.push(finalVal);
    }
  }

  return out;
}

var Matrix = function () {
  function Matrix(w, h, data) {
    var _this = this;

    _classCallCheck(this, Matrix);

    this.width = w;
    this.height = h;
    if (!data) data = new Array(w * h).fill(0);else if (typeof data === "function") {
      data = new Array(w * h).fill(0).map(function (_, i) {
        return data(_this.toCoords(i));
      });
    }
    this.data = data;
  }

  _createClass(Matrix, [{
    key: 'toIndex',
    value: function toIndex(x, y) {
      (0, _invariant2.default)(x >= 0 && x < this.width, "x out of bounds");
      (0, _invariant2.default)(y >= 0 && y < this.height, "y out of bounds");
      return y * this.width + x;
    }
  }, {
    key: 'toCoords',
    value: function toCoords(i) {
      var x = i % this.width;
      var y = (i - x) / this.width;
      return { x: x, y: y };
    }
  }, {
    key: 'get',
    value: function get(x, y) {
      var idx = this.toIndex(x, y);
      return this.data[idx];
    }
  }, {
    key: 'set',
    value: function set(x, y, val) {
      var idx = this.toIndex(x, y);
      this.data[idx] = val;
    }
  }, {
    key: 'forEach',
    value: function forEach(cb) {
      var _this2 = this;

      this.data.map(function (val, i) {
        var coords = _this2.toCoords(i);
        coords.index = i;
        return cb(val, coords, _this2);
      });
    }
  }, {
    key: 'map',
    value: function map(cb) {
      var _this3 = this;

      var newMatrix = new Matrix(this.width, this.height);
      newMatrix._data = this.data.map(function (val, i) {
        var coords = _this3.toCoords(i);
        coords.index = i;
        return cb(val, coords, _this3);
      });
      return newMatrix;
    }
  }, {
    key: 'spread',
    value: function spread(amountX) {
      var amountY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : amountX;

      (0, _invariant2.default)(amountX > 0 && amountY > 0, "spread amount must tbe positive");
      var newWidth = amountX * (this.width - 1) + 1;
      var newHeight = amountY * (this.height - 1) + 1;
      var newMatrix = new Matrix(newWidth, newHeight);
      this.forEach(function (val, _ref2) {
        var x = _ref2.x,
            y = _ref2.y;

        var ax = x * amountX;
        var ay = y * amountY;
        newMatrix.set(ax, ay, val);
      });
      return newMatrix;
    }
  }, {
    key: 'rotate',
    value: function rotate() {
      var newMatrix = new Matrix(this.width, this.height);
      newMatrix.data = this.data.reverse();
      return newMatrix;
    }
  }, {
    key: 'flatten',
    value: function flatten() {
      return this.data;
    }
  }, {
    key: 'data',
    set: function set(val) {
      (0, _invariant2.default)(val.length === this.size, "data does not fit in matrix");
      this._data = val;
    },
    get: function get() {
      return this._data;
    }
  }, {
    key: 'size',
    get: function get() {
      return this.width * this.height;
    }
  }]);

  return Matrix;
}();

/**
 * Convolutional Layer
 * errrrr google it :/
 * @extends Layer
 */


var ConvolutionalLayer = function (_Layer) {
  _inherits(ConvolutionalLayer, _Layer);

  /**
   * @param  {Object} params
   * @param  {number} params.inW - input width
   * @param  {number} params.inH - input height
   * @param  {number} params.inD - input depth
   * @param  {number} [params.stride=1] - stride length
   * @param  {number} [params.strideX] - stride length x
   * @param  {number} [params.strideY] - stride length y
   * @param  {number} [params.filterSize=2] - size of filter
   * @param  {number} [params.filterW] - size of filter w
   * @param  {number} [params.filterH] - size of filter
   * @param  {number} [filters=8] - number of filters to use
   * @param  {number} [zeroPadding=0] - padding to be applied before convolutions
   */
  function ConvolutionalLayer(_ref3) {
    var inW = _ref3.inW,
        inH = _ref3.inH,
        inD = _ref3.inD,
        _ref3$stride = _ref3.stride,
        stride = _ref3$stride === undefined ? 1 : _ref3$stride,
        strideX = _ref3.strideX,
        strideY = _ref3.strideY,
        _ref3$filterSize = _ref3.filterSize,
        filterSize = _ref3$filterSize === undefined ? 2 : _ref3$filterSize,
        filterW = _ref3.filterW,
        filterH = _ref3.filterH,
        _ref3$filters = _ref3.filters,
        filterCount = _ref3$filters === undefined ? 8 : _ref3$filters,
        _ref3$zeroPadding = _ref3.zeroPadding,
        zeroPadding = _ref3$zeroPadding === undefined ? 0 : _ref3$zeroPadding,
        zeroPaddingX = _ref3.zeroPaddingX,
        zeroPaddingY = _ref3.zeroPaddingY,
        unknownOptions = _objectWithoutProperties(_ref3, ['inW', 'inH', 'inD', 'stride', 'strideX', 'strideY', 'filterSize', 'filterW', 'filterH', 'filters', 'zeroPadding', 'zeroPaddingX', 'zeroPaddingY']);

    _classCallCheck(this, ConvolutionalLayer);

    var _this4 = _possibleConstructorReturn(this, (ConvolutionalLayer.__proto__ || Object.getPrototypeOf(ConvolutionalLayer)).call(this));

    _this4.type = "convolutional";


    (0, _invariant2.default)(inW !== undefined && inH !== undefined && inD !== undefined, "must specify inW, inH and inD");
    (0, _invariant2.default)(Object.keys(unknownOptions).length === 0, 'Unknown options: ' + Object.keys(unknownOptions));

    _this4.strideX = strideX || stride;
    _this4.strideY = strideY || stride;

    _this4.filterW = filterW || filterSize;
    _this4.filterH = filterH || filterSize;
    _this4.filterCount = filterCount;

    _this4.zeroPaddingX = zeroPaddingX || zeroPadding;
    _this4.zeroPaddingY = zeroPaddingY || zeroPadding;

    _this4.inW = inW;
    _this4.inH = inH;
    _this4.inD = inD;

    _this4.outW = (_this4.inW + 2 * _this4.zeroPaddingX - _this4.filterW) / _this4.strideX + 1;
    _this4.outH = (_this4.inH + 2 * _this4.zeroPaddingY - _this4.filterH) / _this4.strideY + 1;
    _this4.outD = filterCount;

    (0, _invariant2.default)(_this4.outW % 1 === 0 && _this4.outH % 1 === 0, "non integer output size");

    _this4.filters = Array(_this4.filterCount).fill(null).map(function () {
      //1 matrix per input layer
      return Array(_this4.inD).fill(null).map(function () {
        return new Matrix(_this4.filterW, _this4.filterH, function () {
          return Math.random() - 0.5;
        });
      });
    });

    return _this4;
  }

  // splits an array in n number of chunks
  // ([1,2,3,4], 2) => [[1,2], [3,4]]


  _createClass(ConvolutionalLayer, [{
    key: 'chunkInto',
    value: function chunkInto(arr, n) {
      (0, _invariant2.default)(arr.length % n === 0, "can't evenly chunk");
      var chunkSize = arr.length / n;
      var chunkedArr = [];
      for (var i = 0; i < arr.length; i += chunkSize) {
        chunkedArr.push(arr.slice(i, i + chunkSize));
      }
      return chunkedArr;
    }

    // converts an array into a volume
    // returns an array of matrices, each matrix is a layer and of size w, h

  }, {
    key: 'volumize',
    value: function volumize(w, h, d, arr) {
      (0, _invariant2.default)(w * h * d === arr.length, "invalid volume length");
      return this.chunkInto(arr, d).map(function (data) {
        return new Matrix(w, h, data);
      });
    }

    /** @inheritdoc */

  }, {
    key: 'getOutput',
    value: function getOutput(activation) {
      var _this5 = this;

      activation.output = activation.input.map(function (input) {
        // for each input split it into layers
        // each layer gets its own filter matrx
        var inputVolume = _this5.volumize(_this5.inW, _this5.inH, _this5.inD, input);

        // for each set of filters
        var eachFilterOutput = _this5.filters.map(function (filterVolume) {
          var convolvedLayers = inputVolume.map(function (layer, depth) {
            var filter = filterVolume[depth];
            return convolution(layer, filter, {
              strideX: _this5.strideX,
              strideY: _this5.strideY,
              zeroPaddingX: _this5.zeroPaddingX,
              zeroPaddingY: _this5.zeroPaddingY
            });
          });
          return convolvedLayers[0].map(function (_, i) {
            return convolvedLayers.reduce(function (acc, x) {
              return acc + x[i];
            }, 0);
          });
        });
        return (0, _utils.flatten)(eachFilterOutput);
      });
    }

    /** @inheritdoc */

  }, {
    key: 'getInputGradient',
    value: function getInputGradient(activation) {
      var _this6 = this;

      activation.inputGradient = activation.outputGradient.map(function (outputGradient) {
        (0, _invariant2.default)(_this6.outW * _this6.outH * _this6.outD === outputGradient.length, 'incorrect output gradient size');

        var outputGradientVolume = _this6.volumize(_this6.outW, _this6.outH, _this6.outD, outputGradient); // each layer is one filterSet

        var inputGradientVolume = outputGradientVolume.map(function (outputGradient, i) {
          var filterVolume = _this6.filters[i];

          var reverseZPaddingX = _this6.filterW - _this6.zeroPaddingX - 1;
          var reverseZPaddingY = _this6.filterH - _this6.zeroPaddingY - 1;
          var spreadOutGrad = outputGradient.spread(_this6.strideX, _this6.strideY);
          //may need to loop oer filter set

          var inputGradients = filterVolume.map(function (filter) {
            var rotatedFilter = filter.rotate();
            return convolution(spreadOutGrad, rotatedFilter, { zeroPaddingX: reverseZPaddingX, zeroPaddingY: reverseZPaddingY });
          });

          return (0, _utils.flatten)(inputGradients);
        });

        return (0, _utils.flatten)(inputGradientVolume);
      });
    }

    /** @inheritdoc */

  }, {
    key: 'getParamGrads',
    value: function getParamGrads(activation) {
      var _this7 = this;

      activation.paramGrads = activation.outputGradient.map(function (outputGradient, i) {
        var inputVolume = _this7.volumize(_this7.inW, _this7.inH, _this7.inD, activation.input[i]); //each input layer
        var outputGradientVolume = _this7.volumize(_this7.outW, _this7.outH, _this7.outD, outputGradient); // each layer is a filterVolume


        var filterGrads = outputGradientVolume.map(function (outputGradient, i) {
          // for each output layer map over all inputs to generate the filter grads
          var spreadOutGrad = outputGradient.spread(_this7.strideX, _this7.strideY);

          var x = inputVolume.map(function (input) {
            return convolution(input, spreadOutGrad, { zeroPaddingX: _this7.zeroPaddingX, zeroPaddingY: _this7.zeroPaddingY, stride: 1 });
          });

          // return x
          return (0, _utils.flatten)(x);
        });
        // return filterGrads;
        return (0, _utils.flatten)(filterGrads);
      });
    }

    /** @inheritdoc */

  }, {
    key: 'getParams',
    value: function getParams() {
      //TODO
      // console.log(flatten(flatten(this.filters)).map(mat => mat.flatten()))
      // debugger
      return (0, _utils.flatten)((0, _utils.flatten)((0, _utils.flatten)(this.filters)).map(function (mat) {
        return mat.flatten();
      }));
    }

    /** @inheritdoc */

  }, {
    key: 'setParams',
    value: function setParams(val) {
      var _this8 = this;

      this.filters = this.chunkInto(val, this.filterCount).map(function (arr) {
        return _this8.chunkInto(arr, _this8.inD).map(function (arr) {
          return new Matrix(_this8.filterW, _this8.filterH, arr);
        });
      });
    }

    /** @inheritdoc */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        inW: this.inW,
        inH: this.inH,
        stride: this.stride,
        filterSize: this.filterSize
      };
    }

    /** @inheritdoc */

  }], [{
    key: 'fromJSON',
    value: function fromJSON(json) {
      var inW = json.inW,
          inH = json.inH,
          stride = json.stride,
          filterSize = json.filterSize;

      return new this({ inW: inW, inH: inH, stride: stride, filterSize: filterSize });
    }
  }]);

  return ConvolutionalLayer;
}(_Layer3.default);

// import Activation from '../Activation'


// const conv = new ConvolutionalLayer({
//   inW: 5,
//   inH: 5,
//   inD: 3,
//   stride: 2,
//   zeroPadding: 1,
//   filters: 1,
//   filterSize: 3
// });

// const activation = {
//   input: [
//     [
//       1,0,0,0,2,
//       0,0,0,2,2,
//       2,0,0,2,1,
//       2,2,2,1,2,
//       1,1,1,0,1,

//       0,2,2,2,2,
//       1,0,1,2,0,
//       1,0,0,1,2,
//       0,0,0,2,2,
//       0,1,0,2,1,

//       0,0,1,0,0,
//       2,0,2,1,2,
//       1,2,2,1,2,
//       2,1,2,2,0,
//       0,2,2,2,2
//     ]
//   ],

// };
// conv.filters[0][0].data = [0,-1,-1,1,-1,1,-1,0,0]
// conv.filters[0][1].data = [-1,-1,1,0,-1,1,1,1,0]
// conv.filters[0][2].data = [1,0,-1,-1,-1,-1,1,-1,1]

// // conv.filters[1][0].data = [1,-1,0,0,-1,-1,-1,-1,0]
// // conv.filters[1][1].data = [0,0,1,-1,0,-1,1,0,0]
// // conv.filters[1][2].data = [-1,1,-1,1,-1,0,-1,0,-1]


// conv.getOutput(activation);

// activation.outputGradient = [
//   [1,0,2,-1,0,0,1,2,2],
// ]

// conv.getInputGradient(activation)
// console.log(activation);


// throw 'stop'


exports.default = ConvolutionalLayer;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Layer2 = __webpack_require__(1);

var _Layer3 = _interopRequireDefault(_Layer2);

var _Matrix = __webpack_require__(0);

var _Matrix2 = _interopRequireDefault(_Matrix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Softmax activation layer
 * @extends Layer
 */
var SigmoidLayer = function (_Layer) {
  _inherits(SigmoidLayer, _Layer);

  function SigmoidLayer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SigmoidLayer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SigmoidLayer.__proto__ || Object.getPrototypeOf(SigmoidLayer)).call.apply(_ref, [this].concat(args))), _this), _this.type = "sigmoid", _this.f = function (x) {
      return 1 / (1 + Math.exp(-x));
    }, _this.fPrime = function (x) {
      return x * (1 - x);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * @param  {number} x
   * @returns {number} sigmoid of x
   */


  /**
   * @param  {number} x
   * @returns {number} differential sigmoid of x
   */


  _createClass(SigmoidLayer, [{
    key: "getOutput",


    /** @inheritdoc */
    value: function getOutput(activation) {
      activation.output = _Matrix2.default.map(activation.input, this.f);
    }

    /** @inheritdoc */

  }, {
    key: "getInputGradient",
    value: function getInputGradient(activation) {
      activation.inputGradient = _Matrix2.default.multiply(_Matrix2.default.map(activation.output, this.fPrime), activation.outputGradient);
    }
  }]);

  return SigmoidLayer;
}(_Layer3.default);

exports.default = SigmoidLayer;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Layer2 = __webpack_require__(1);

var _Layer3 = _interopRequireDefault(_Layer2);

var _Matrix = __webpack_require__(0);

var _Matrix2 = _interopRequireDefault(_Matrix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Relu activation layer
 * @extends Layer
 */
var ReluLayer = function (_Layer) {
  _inherits(ReluLayer, _Layer);

  function ReluLayer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ReluLayer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ReluLayer.__proto__ || Object.getPrototypeOf(ReluLayer)).call.apply(_ref, [this].concat(args))), _this), _this.type = "relu", _this.f = function (x) {
      return Math.max(0, x);
    }, _this.fPrime = function (x) {
      return x > 0 ? 1 : 0;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * @param  {number} x
   * @returns {number} max of [0, x]
   */


  /**
   * @param  {number} x
   * @returns {number} differential of relu?
   */


  _createClass(ReluLayer, [{
    key: "getOutput",


    /** @inheritdoc */
    value: function getOutput(activation) {
      activation.output = _Matrix2.default.map(activation.input, this.f);
    }

    /** @inheritdoc */

  }, {
    key: "getInputGradient",
    value: function getInputGradient(activation) {
      activation.inputGradient = _Matrix2.default.multiply(_Matrix2.default.map(activation.output, this.fPrime), activation.outputGradient);
    }
  }]);

  return ReluLayer;
}(_Layer3.default);

exports.default = ReluLayer;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Layer2 = __webpack_require__(1);

var _Layer3 = _interopRequireDefault(_Layer2);

var _Matrix = __webpack_require__(0);

var _Matrix2 = _interopRequireDefault(_Matrix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Softmax output layer
 * @extends Layer
 */
var SoftmaxLayer = function (_Layer) {
  _inherits(SoftmaxLayer, _Layer);

  function SoftmaxLayer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SoftmaxLayer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SoftmaxLayer.__proto__ || Object.getPrototypeOf(SoftmaxLayer)).call.apply(_ref, [this].concat(args))), _this), _this.type = "softmax", _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SoftmaxLayer, [{
    key: "getOutput",


    /** @inheritdoc */
    value: function getOutput(activation) {
      var inpExp = _Matrix2.default.map(activation.input, function (x) {
        return Math.exp(x);
      });
      var sums = inpExp.map(function (row) {
        return row.reduce(function () {
          var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          return a + b;
        });
      });
      activation.output = _Matrix2.default.map(inpExp, function (inp, x, y) {
        return Math.round(1000 * inp / sums[y]) / 1000;
      });
    }

    /** @inheritdoc */

  }, {
    key: "getInputGradient",
    value: function getInputGradient(activation) {
      var outputGradient = activation.outputGradient,
          output = activation.output;

      activation.inputGradient = _Matrix2.default.map(outputGradient, function (grad) {
        return grad / output[0].length;
      });
    }
  }]);

  return SoftmaxLayer;
}(_Layer3.default);

exports.default = SoftmaxLayer;

/***/ })
/******/ ])));
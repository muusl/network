/**
 * returns a + b
 * performs element-wise addition if an array is passed
 * @param  {number[]|number} a
 * @param  {number[]|number} b
 * @returns {number[]|number}
 */
export const arrayAdd = (a, b) => {
  const aArray = Array.isArray(a)
  const bArray = Array.isArray(b)
  if (aArray && bArray) {
    return a.map((aEl, i) => aEl + b[i])
  } else if (aArray) {
    return a.map(el => el + b)
  } else if (bArray) {
    return b.map(el => a + el)
  } else {
    return a + b
  }
}

/**
 * returns a - b
 * performs element-wise subtraction if an array is passed
 * @param  {number[]|number} a
 * @param  {number[]|number} b
 * @returns {number[]|number}
 */
export const arraySub = (a, b) => {
  const aArray = Array.isArray(a)
  const bArray = Array.isArray(b)
  if (aArray && bArray) {
    return a.map((aEl, i) => aEl - b[i])
  } else if (aArray) {
    return a.map(el => el - b)
  } else if (bArray) {
    return b.map(el => a - el)
  } else {
    return a - b
  }
}

/**
 * returns a * b
 * performs element-wise multiplication if an array is passed
 * @param  {number[]|number} a
 * @param  {number[]|number} b
 * @returns {number[]|number}
 */
export const arrayMultiply = (a, b) => {
  const aArray = Array.isArray(a)
  const bArray = Array.isArray(b)
  if (aArray && bArray) {
    return a.map((aEl, i) => aEl * b[i])
  } else if (aArray) {
    return a.map(el => el * b)
  } else if (bArray) {
    return b.map(el => a * el)
  } else {
    return a * b
  }
}

/**
 * returns a / b
 * performs element-wise division if an array is passed
 * @param  {(number[]|number)} a
 * @param  {number[]|number} b
 * @returns {number[]|number}
 */
export const arrayDivide = (a, b) => {
  const aArray = Array.isArray(a)
  const bArray = Array.isArray(b)
  if (aArray && bArray) {
    return a.map((aEl, i) => aEl / b[i])
  } else if (aArray) {
    return a.map(el => el / b)
  } else if (bArray) {
    return b.map(el => a / el)
  } else {
    return a / b
  }
}

export const arraySum = arr => {
  return arr.reduce(sum)
}

/**
 * creates an array of length n filled with `value`. if value is a function
 * then it will be invoked for each element and its return will be that elements
 * value.
 * @param  {number} n - length of the array
 * @param  {any|(index:number)=>any} value - default value or callback for each element
 * @returns {any[]}
 */
export const createArray = (n, value) => {
  if (typeof value === "function") {
    return Array(n)
      .fill(undefined)
      .map((_, i) => value(i))
  } else {
    return Array(n).fill(value)
  }
}

/**
 * returns a+b
 * used primarily to find the sum of an array arr.reduce(sum)
 * @param  {} a=0
 * @param  {} b=0
 */
export const sum = (a = 0, b = 0) => a + b

export const flatten = arr => Array.prototype.concat.apply([], arr)

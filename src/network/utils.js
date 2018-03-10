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

export const createArray = (n, value) => {
  if (typeof value === "function") {
    return Array(n)
      .fill(undefined)
      .map((_, i) => value(i))
  } else {
    return Array(n).fill(value)
  }
}

export const loop = (thing, callback) => {
  if (typeof thing === "number") {
    if (callback) {
      const rets = []
      for (let i = 0; i < thing; i++) {
        rets.push(callback(i))
      }
      return rets
    }
    return Array(thing).fill(undefined)
  } else if (thing.hasOwnProperty("loop")) {
    return thing.loop(callback)
  } else {
    console.error(thing)
    throw new Error("unsupported loop")
  }
}

export const sum = (a = 0, b = 0) => a + b

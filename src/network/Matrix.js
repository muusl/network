export default class Matrix {
  constructor(arr) {
    this.values = arr
  }

  loop(callback) {
    return this.values.map((row, i) => row.map((cell, j) => callback(cell, i, j, a)))
  }

  static dot(a, b) {
    return a.map((_, i) => {
      return b[0].map((_, j) => {
        return b.reduce((acc, _, k) => acc + a[i][k] * b[k][j], 0)
      })
    })
  }
  static map(a, cb) {
    return a.map((row, y) => row.map((cell, x) => cb(cell, x, y, a)))
  }
  static add(a, b) {
    return Matrix.map(a, (el, x, y) => el + b[y][x])
  }
  static sub(a, b) {
    return Matrix.map(a, (el, x, y) => el - b[y][x])
  }
  static multiply(a, b) {
    return Matrix.map(a, (el, x, y) => el * b[y][x])
  }
  static divide(a, b) {
    return Matrix.map(a, (el, x, y) => el / b[y][x])
  }
  static transpose(a) {
    return a[0].map((_, x) => a.map((_, y) => a[y][x]))
  }
  static flatten(a) {
    return Array.prototype.concat.apply([], a)
  }
  static inflate(a, rows, cols) {
    if (a.length !== rows * cols)
      throw new Error("incompatible sizes, length or array must match rows*cols")
    return Matrix.create(rows, cols, (x, y) => a[y * cols + x])
  }
  static sum(a) {
    return this.flatten(a).reduce((a = 0, b = 0) => a + b)
  }
  static create(rows, cols, initializer) {
    const mat = Array(rows)
      .fill(null)
      .map(() => Array(cols).fill(null))

    if (initializer) {
      return Matrix.map(mat, (_, x, y) => initializer(x, y))
    }
    return mat
  }
}

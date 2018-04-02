/**
 * class to group all matrix functions
 */
export default class Matrix {
  /**
   * @param {number[][]} a
   * @param {number[][]} b
   * @returns {number[][]} the dot product of a and b
   */
  static dot(a, b) {
    return a.map((_, i) => {
      return b[0].map((_, j) => {
        return b.reduce((acc, _, k) => acc + a[i][k] * b[k][j], 0)
      })
    })
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
  static map(a, cb) {
    return a.map((row, y) => row.map((cell, x) => cb(cell, x, y, a)))
  }

  /**
   * performs element-wise addition on a and b
   * @param  {number[][]} a
   * @param  {number[][]} b
   * @returns {number[][]} a+b
   */
  static add(a, b) {
    return Matrix.map(a, (el, x, y) => el + b[y][x])
  }

  /**
   * performs element-wise subtraction on a and b
   * @param  {number[][]} a
   * @param  {number[][]} b
   * @returns {number[][]} a-b
   */
  static sub(a, b) {
    return Matrix.map(a, (el, x, y) => el - b[y][x])
  }

  /**
   * performs element-wise multiplication on a and b
   * @param  {number[][]} a
   * @param  {number[][]} b
   * @returns {number[][]} a*b
   */
  static multiply(a, b) {
    return Matrix.map(a, (el, x, y) => el * b[y][x])
  }

  /**
   * performs element-wise division on a and b
   * @param  {number[][]} a
   * @param  {number[][]} b
   * @returns {number[][]} a/b
   */
  static divide(a, b) {
    return Matrix.map(a, (el, x, y) => el / b[y][x])
  }

  /**
   * @param  {number[][]} a
   * @returns {number[][]} transposed version of a
   */
  static transpose(a) {
    return a[0].map((_, x) => a.map((_, y) => a[y][x]))
  }

  /**
   * flattens a matrix into a single array in the form of [ row | row| row ]
   * @param {number[][]} a
   * @returns {number[]}
   */
  static flatten(a) {
    return Array.prototype.concat.apply([], a)
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
  static inflate(a, rows, cols) {
    if (a.length !== rows * cols)
      throw new Error("incompatible sizes, length or array must match rows*cols")
    return Matrix.create(rows, cols, (x, y) => a[y * cols + x])
  }

  /**
   * sums every element in the matrix
   * @param {number[][]} a
   * @returns {number}
   */
  static sum(a) {
    return this.flatten(a).reduce((a = 0, b = 0) => a + b)
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

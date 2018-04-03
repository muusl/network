import Matrix from "./Matrix";
import { arraySub, arrayDivide, arraySum, arrayMultiply } from "./utils";

export default class Output {
  constructor(predicted, labels) {
    this.predicted = predicted;
    this.labels = labels;
  }

  get n() {
    return this.predicted.length;
  }

  avg(arr) {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  }

  percentage() {
    let errors = Matrix.divide(this.predicted, this.labels);
    // errors = Matrix.map(errors, Math.abs);
    // errors = Matrix.divide(errors, actual);
    let tot = 0;
    let cnt = 0;

    Matrix.map(errors, (el, x, y) => {
      if (el === Infinity) return;
      el *= 100;
      tot += el > 100 ? 200 - el : el;
      cnt++;
    });
    return tot / cnt;
  }

  rmse() {
    return this.avg(
      this.predicted.map((ps, i) => {
        const as = this.labels[i];
        const x = this.avg(arraySub(ps, as).map(x => x ** 2));
        return x ** 0.5;
      })
    );
  }

  msre() {
    return this.avg(
      this.predicted.map((ps, i) => {
        const as = this.labels[i];
        return this.avg(arrayDivide(arraySub(ps, as), as).map(x => x ** 2));
      })
    );
  }

  ce() {
    return this.avg(
      this.predicted.map((ps, i) => {
        const as = this.labels[i];

        const top = arraySum(arraySub(ps, as).map(x => x ** 2));
        const bottom = arraySum(arraySub(as, this.avg(as)).map(x => x ** 2));
        return 1 - top / bottom;
      })
    );
  }

  rsqr() {
    return this.avg(
      this.predicted.map((ps, i) => {
        const as = this.labels[i];
        const top = arraySum(
          arrayMultiply(arraySub(as, this.avg(as)), arraySub(ps, this.avg(ps)))
        );
        const bottom = Math.sqrt(
          arraySum(
            arrayMultiply(
              arraySub(as, this.avg(as)).map(x => x ** 2),
              arraySub(ps, this.avg(ps)).map(x => x ** 2)
            )
          )
        );
        console.log({ top, bottom });
        return (top / bottom) ** 2;
      })
    );
  }
}

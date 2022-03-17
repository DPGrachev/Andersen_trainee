function concatStrings(str,separator) {
  if (typeof separator !== "string") {
    separator = '';
  }

  return function concatOneMoreString(anotherStr) {
    if (typeof anotherStr !== "string") {
      return str;
    }

    str += separator + anotherStr;

    return concatOneMoreString;
  }
}

class Calculator {
  constructor(x,y){
    if(!Number.isFinite(x) || !Number.isFinite(y)){
      throw new Error();
    }

    this._x = x;
    this._y = y;

    this.logSum = this.logSum.bind(this);
    this.logMul = this.logMul.bind(this);
    this.logSub = this.logSub.bind(this);
    this.logDiv = this.logDiv.bind(this);
  }

  setX(num) {
    if (!Number.isFinite(num)) {
      throw new Error('Невалидное число');
    }

    this._x = num;
  }

  setY(num) {
    if (!Number.isFinite(num)) {
      throw new Error('Невалидное число');
    }

    this._y = num;
  }

  logSum() {
    console.log(this._x + this._y);
  }

  logMul() {
    console.log(this._x * this._y);
  }

  logSub() {
    console.log(this._x - this._y);
  }

  logDiv() {
    if (this._y === 0) {
      throw new Error('Нельзя делить на 0');
    }

    console.log(this._x / this._y);
  }
}
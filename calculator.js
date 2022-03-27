export class Calculator {
  #firstValue;
  #secondValue;
  #operation;
  #operationSymbol;

  constructor() {
    this.sum = this.sum.bind(this);
    this.multiple = this.multiple.bind(this);
    this.difference = this.difference.bind(this);
    this.division = this.division.bind(this);
  }

  get firstValue() {
    return this.#firstValue;
  }

  set firstValue(value) {
    this.#firstValue = value;
  }

  get secondValue() {
    return this.#secondValue;
  }

  set secondValue(value) {
    this.#secondValue = value;
  }

  get operationSymbol() {
    return this.#operationSymbol;
  }

  set operationSymbol(value) {
    this.#operationSymbol = value;
  }

  get operation() {
    return this.#operation;
  }

  set operation(value) {
    switch (value) {
      case '*' : {
        this.#operation = this.multiple;
        break;
      };
      case '/' : {
        this.#operation = this.division;
        break;
      };
      case '-' : {
        this.#operation = this.difference;
        break;
      };
      case '+' : {
        this.#operation = this.sum;
        break;
      };
      default : {
        this.#operation = null;
      }
    }
  }

  sum() {
    return Number(this.firstValue) + Number(this.secondValue);
  }

  multiple() {
    return Number(this.firstValue) * Number(this.secondValue);
  }

  difference() {
    return Number(this.firstValue) - Number(this.secondValue);
  }

  division() {
    if (Number(this.secondValue) === 0) {
      throw new Error('Нельзя делить на 0');
    }

    return Number(this.firstValue) / Number(this.secondValue);
  }

  getResult() {
    if ( this.#operation ) {
      if (!this.#secondValue) {
        this.#secondValue = this.#firstValue;
      }
      
      let result = Number(this.#operation().toFixed(8).replace(/0*$/,""));
      
      if (String(result).length > 15) {
        result = result.toExponential(8)
      }

      return result;
    }
  }
}
class Stack {
  constructor (maxSize = 10) {
    if ( !Number.isFinite(maxSize) || maxSize <= 0 ) {
      throw new Error();
    }
    
    this.maxSize = maxSize;
    this.size = 0;
    this.upperElem = null;
  }

  push(elem) {
    if (this.upperElem && this.size === this.maxSize) {
      throw new Error('Стек переполнен');
    }

    this.size++;
    const newElem = {
      value: elem,
      prev: null,
    }

    if (!this.upperElem) {
      this.upperElem = newElem;

      return;
    }

    newElem.prev = this.upperElem;
    this.upperElem = newElem;
  }

  pop() {
    if (this.size === 0) {
      throw new Error('Стек пуст');
    }

    const currentElem = this.upperElem;

    this.upperElem = this.upperElem.prev;
    this.size--;

    return currentElem.value;
  }

  peek() {
    return this.upperElem ? this.upperElem.value : null;
  }

  isEmpty() {
    return this.size === 0;
  }

  toArray() {
    const arr = [];
    let currentElem = this.upperElem;

    while(currentElem) {
      arr.push(currentElem.value);
      currentElem = currentElem.prev;
    }

    return arr;
  }

  static fromIterable(iterable) {
    if (typeof iterable[Symbol.iterator] !== 'function') {
      throw new Error();
    }

    const length = iterable.length || iterable.size;
    const stack = new Stack(length);

    iterable.forEach((elem) => {
      stack.push(elem);
    })

    return stack;
  }
}

module.exports = {Stack};

class Stack {
  constructor(maxSize = 10) {
    if ( !Number.isFinite(maxSize) || maxSize <= 0 ) {
      throw new Error();
    }
    
    this.maxSize = maxSize;
    this.stack = {};
    this.size = 0;
  }

  push(elem) {
    if (this.size === this.maxSize) {
      throw new Error('Стек переполнен');
    }

    this.size++;
    this.stack[this.size] = elem;
  }

  pop() {
    if (this.size === 0) {
      throw new Error('Стек пуст');
    }

    const upperElem = this.stack[this.size];

    delete this.stack[this.size];
    this.size--;

    return upperElem;
  }

  peek() {
    return this.stack[this.size] || null;
  }

  isEmpty() {
    return this.size === 0;
  }

  toArray() {
    return Object.values(this.stack);
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

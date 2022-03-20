class LinkedList {
  constructor() {
    this.start = null;
    this.end = null;
  }

  append(elem) {
    const newElem = {
      value: elem,
      next: null,
    };

    if (!this.start || !this.end) {
      this.start = newElem;
      this.end = newElem;

      return;
    }

    this.end.next = newElem;
    this.end = newElem;
  }

  prepend(elem) {
    const newElem = {
      value: elem,
      next: null,
    };

    if (!this.start || !this.end) {
      this.start = newElem;
      this.end = newElem;

      return;
    }

    newElem.next = this.start;
    this.start = newElem;
  }

  find(elem) {
    let currentElem = this.start;

    while (currentElem) {
      if (currentElem.value === elem){
        return currentElem;
      }

      currentElem = currentElem.next;
    }

    return null;
  }

  toArray() {
    const arr = [];
    let currentElem = this.start;

    while (currentElem) {
      arr.push(currentElem.value);

      currentElem = currentElem.next;
    }

    return arr;
  }

  static fromIterable(iterable) {
    if (typeof iterable[Symbol.iterator] !== 'function') {
      throw new Error();
    }

    const linkedList = new LinkedList();

    iterable.forEach((elem) => {
      linkedList.append(elem);
    })

    return linkedList;
  }
}

module.exports = {LinkedList};

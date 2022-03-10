function makeObjectDeepCopy(obj) {
  const newObject = {};
  const isObject = (value) => {
    if (typeof value === 'object') {
      return true;
    }

    return false;
  }

  Object.keys(obj).forEach((key) => {
    if ( isObject(obj[key]) ) {
      newObject[key] = makeObjectDeepCopy(obj[key]);
    } else {
      newObject[key] = obj[key];
    }
  })

  return newObject;
}

function selectFromInterval(arrayOfNumbers, startInterval, endInterval) {
  const isValidArgs = () => {
    let isValid = true;

    if (Array.isArray(arrayOfNumbers) && Number.isInteger(startInterval) && Number.isInteger(endInterval)) {
      arrayOfNumbers.forEach((value) => {
        if (!Number.isInteger(value)){
          isValid = false;
        }
      })  
    } else {
      isValid = false;
    }

    return isValid;
  }

  if ( !isValidArgs() ) {
    throw new Error();
  }

  return arrayOfNumbers.filter((value) => {
    return value >= Math.min(startInterval, endInterval) && value <= Math.max(startInterval, endInterval);
  });
}

const myIterable = {
  from: 1,
  to: 4,

  [Symbol.iterator](){
    if (this.to < this.from || !Number.isInteger(this.from) || !Number.isInteger(this.to)) {
      throw new Error();
    }

    this.current = this.from;
    return this;
  },

  next(){
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  }
}

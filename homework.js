Array.prototype.myFilter = function(callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(`${callback} is not a function`);
  }

  const context = thisArg || this;
  const oldArr = context.slice();
  const newArr = [];

  for (let i = 0; i < oldArr.length; i++) {
    if ( callback(oldArr[i],i,oldArr) ) {
      newArr[newArr.length] = oldArr[i];
    }
  }

  return newArr;
}

Array.prototype.myForEach = function(callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(`${callback} is not a function`);
  }

  const context = thisArg;
  let index = 0;

  while (index < this.length){
    if(this[index] || this[index] === 0){
      callback.call(context, this[index], index, this);
    }
    index++;
  }

}

Array.prototype.myReduce = function(callback, initialValue) {
  if (typeof callback !== 'function') {
    throw new TypeError(`${callback} is not a function`);
  }

  const context = this.slice();
  const firstIndex = initialValue ? 0 : 1;
  let accumulator = initialValue || this[0];

  if (!accumulator) {
    throw new TypeError('Reduce of empty array with no initial value');
  }

  if (context.length === 1 && !initialValue) {
    return context[0];
  }

  if (context.length === 0 && initialValue) {
    return initialValue;
  }
  
  for (let i = firstIndex; i < context.length; i++) {
    accumulator = callback(accumulator, context[i], i, context);
  }

  return accumulator;
}

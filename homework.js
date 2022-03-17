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

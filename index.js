'use strict';
const isPromise = (func) => {
  return func && typeof func.then === 'function';
};

module.exports = (funcArray) => {
  if (!Array.isArray(funcArray)) {
    return Promise.reject('list need to be an array of function');
  };

  if (funcArray.length === 0) {
    return Promise.reject('No functions passed.');
  }

  if (funcArray.length === 1) {
    if (typeof funcArray[0] !== 'function'){
      return Promise.reject(`First element of the array should be a function, got ${typeof funcArray[0]}`);
    }
    return Promise.resolve(funcArray[0]());
  }

  return funcArray.reduce((prev, curr) => {

    if (prev === funcArray[0]) {
      if (typeof prev !== 'function'){
        return Promise.reject('List elements should be function to call.');
      }
      const prevFunc = prev();
      if (!isPromise(prevFunc)){
        return Promise.reject('Function return value should be a promise.');
      }
      return prevFunc.then(curr);
    }
    if (!isPromise(prev)) {
      return Promise.reject('Function return value should be a promise.');
    }
    return prev.then(curr);
  });
};

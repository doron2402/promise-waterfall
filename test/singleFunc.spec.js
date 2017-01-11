'use strict';
const Code = require('code');
const Lab = require('lab');
const Waterfall = require('../index');

const lab = exports.lab = Lab.script();
const expect = Code.expect;

const printSomething = () => {
  return new Promise((resolve) => {
    return setTimeout(() => {
      return resolve('Im a single function');
    }, 50);
  });
};

lab.describe('Run ONE function in waterfall', () => {
  lab.describe('Make sure result is a string', () => {
    lab.it('Should be a string', (done) => {
      Waterfall([printSomething])
      .then((results) => {
        expect(results).to.be.equal('Im a single function');
        done();
      });
    });
  });
});

'use strict';
const Code = require('code');
const Lab = require('lab');
const Waterfall = require('../index');

const lab = exports.lab = Lab.script();
const expect = Code.expect;

const getSomeDataFromDB = () => {
  return new Promise((resolve) => {
    return setTimeout(() => {
      resolve([
        { id: 1 },
        { id: 2 }
      ]);
    }, 100);
  });
};

const makeHttpCall = (result) => {
  const actions = result.map((obj) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`making call using obj.id: ${obj.id}`);
        expect(typeof obj.id).to.be.equal('number');
        const val = obj.id + 10;
        return resolve(val);
      }, 100);
    });
  });
  return Promise.all(actions);
};

lab.describe('Run two function in waterfall', () => {
  lab.describe('Make sure result is an array', () => {
    lab.it('Should be an array', (done) => {
      Waterfall([getSomeDataFromDB, makeHttpCall])
      .then((results) => {
        expect(results).to.include([11,12]);
        done();
      })
      .catch((err) => {
        expect(err).to.be.undefined;
      });
    });
  });
});

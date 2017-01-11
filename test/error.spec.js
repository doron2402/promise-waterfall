/* When passing an object instead of an array
  it should return an error
*/
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

lab.describe('When passing an object instead of an array', () => {
  lab.it('Should return an error', (done) => {
    Waterfall({
      getSomeDataFromDB,
      makeHttpCall
    })
    .catch((err) => {
      expect(err).to.be.equal('list need to be an array of function');
      done();
    });
  });
});

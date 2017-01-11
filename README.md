# promise-waterfall
small package to use native JS promises  

## example
```javascript
'use strict';
const Waterfall = require('../index');

const getSomeDataFromDB = () => {
  return new Promise((resolve) => {
    return setTimeout(() => {
      resolve([
        { id: 1 },
        { id: 2 }
      ]);
    }, 1000);
  });
};

const makeHttpCall = (result) => {
  const actions = result.map((obj) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`making call using obj.id: ${obj.id}`);
        const val = obj.id + 10;
        return resolve(val);
      }, 3000);
    });
  });
  return Promise.all(actions);
};

Waterfall([getSomeDataFromDB, makeHttpCall])
.then((results) => {
  // results should be an array with two items [11,12]
  console.log(results);
})
.catch((err) => {
  console.log(err);
});

```

## For more example checkout the `tests` and the `example` directory

## License [DWTFYW] 
  Do what the fuck you want with this free to change/copy/etc..



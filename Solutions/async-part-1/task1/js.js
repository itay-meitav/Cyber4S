/**
 *
 * EXERCISE 1
 *
 * @returns {Promise<3>}
 */
function makePromiseResolveWith3() {
  Promise.resolve("3").then((result) => {
    console.log(result);
  });
}

/**
 *
 * EXERCISE 2
 *
 * @returns {Promise<,"Boo!">}
 */
function makePromiseRejectWithBoo() {
  Promise.resolve("Boo!").catch((error) => {
    console.log(error);
  });
}

/**
 *
 * EXERCISE 3
 *
 * @param {boolean} itShouldResolve - Whether the promise should resolve or reject
 * @returns {Promise<undefined, undefined>}
 */

function makePromiseWithConstructor(itShouldResolve) {
  return new Promise((resolve, reject) => {
    if (itShouldResolve) {
      resolve("true");
    } else {
      reject("false");
    }
  });
}

makePromiseWithConstructor(true)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

/**
 *
 * EXERCISE 4
 *
 * @param {any} value
 * @param {number} delayInMs
 * @return {Promise<any>} - A promise that will resolve with the value after delayInMs milliseconds
 */
function makeDelayPromise(value, delayInMs) {
  setTimeout(() => {
    Promise.resolve(value).then((result) => {
      console.log(result);
    });
  }, delayInMs);
}

module.exports = {
  makePromiseResolveWith3,
  makePromiseRejectWithBoo,
  makePromiseWithConstructor,
  makeDelayPromise,
};

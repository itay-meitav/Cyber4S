/**
 *
 * EXERCISE 1
 *
 * @param {Promise} promise
 * @param {thunk} action
 *
 */
function waitForPromise(promise, action) {
  promise.then(action).catch((error) => {
    console.log(error);
  });
}

let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 1000);
});
waitForPromise(promise, () => console.log("waited"));

/**
 *
 * EXERCISE 2
 *
 * @param {Promise} promise
 * @param {consumer} consumer
 * @param {handler} handler
 */
function consumePromise(promise, consumer, handler) {
  promise.then(consumer).catch(handler);
}

let promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject();
  }, 1000);
});

consumePromise(promise2, () => console.log("handler"));

/**
 * @callback thunk
 * @returns {void}
 */
module.exports = {
  waitForPromise,
  consumePromise,
};

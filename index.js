module.exports = compose;

function compose (middleware) {
  return function* (next) {
    var i = middleware.length;
    var prev = next || noop();
    var curr, type;

    while (i--) {
      type = typeof middleware[i] === 'object';
      curr = type ? middleware[i].compose() : middleware[i];
      prev = curr.call(this, prev);
    }

    yield* prev;
  }
}

function* noop () {}

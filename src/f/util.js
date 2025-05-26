// Util function namspace which contians
// common and helpful utility methods used
// through the project.
class Util {
  static getStaticMethods(klass) {
    return  Object.getOwnPropertyNames(klass).filter(
      (prop) => typeof klass[prop] === 'function' && !Object.prototype.hasOwnProperty.call(klass.prototype, prop)
    );
  }
}

module.exports = Util;

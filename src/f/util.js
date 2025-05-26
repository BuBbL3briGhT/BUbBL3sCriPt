// Util function namspace which contians
// common and helpful utility methods used
// through the project.
class Util {

  // Returns an array of static method
  // names, as strings, from the passed in
  // 'klass' object.
  static getStaticMethods(klass) {
    return  Object.
      getOwnPropertyNames(klass).
      filter(
        (prop) =>
        typeof klass[prop] ===
        'function' &&
        !Object.
          prototype.
          hasOwnProperty.
          call(klass.prototype, prop)
    );
  }

  static makeRootBinding(Base, _eval) {
    const rootBinding = Object.create({});
    const functions = Util.getStaticMethods(Base);
    for (const fn of functions) {
      rootBinding[fn] = Util.makeFunction(
        Base[fn], _eval);
    }
    return rootBinding;
  }

  // Makes and returns interop function for
  // Bubblescript to Javascript invokation.
  //
  // Make and return Bubblescript/Javascript
  // interop function.
  //
  // Crea y devuelve una función de
  // interoperabilidad para la invocación de
  // Bubblescript a Javascript.
  //
  // Skep en gee 'n interop-funksie terug
  // vir die oproep van Bubblescript na
  // Javascript.
  //
  // Crea e restituisce una funzione di
  // interoperabilità per richiamare
  // Bubblescript in Javascript.
  //
  // Ngaryanin lan ngawaliang fungsi interop
  // anggén ngaukin Bubblescript ka
  // Javascript.
  //
  // Crée et renvoie une fonction
  // d'interopérabilité pour appeler
  // Bubblescript en Javascript.
  //
  // Ստեղծում և վերադարձնում է
  // փոխգործակցության ֆունկցիա
  // Bubblescript-ը Javascript-ին կանչելու
  // համար:
  //
  // Vytvoří a vrátí funkci interop pro
  // vyvolání Bubblescriptu do Javascriptu.
  //
  // Ku tumbuluxa no vuyisa ntirho wa
  // interop wo vitana Bubblescript eka
  // Javascript.
  //
  // Bubblescript ကို Javascript သို့
  // ခေါ်ဝေါ်ခြင်းအတွက် interop function တစ်ခုကို
  // ဖန်တီးပြီး ပြန်ပေးသည်။
  static makeFunction(fn, _eval) {
    return (...params) => {
      return fn.call(this,
        params.map(p => _eval(this, p)))
    }
  }

}

module.exports = Util;

// Further Notes and Discussion pretianing
// to Util.
//
// i♡makeFunction/makeRootBinding
  // ? Certian functions from the original
  // rootBinding object don't appear to
  // use mkfn for definition, but still
  // work e.g. muf (have passing test).
  // Need further investigation to
  // determine why this is and how best to
  // represent the distinction if
  // neccessary.
  //
  // possible answer: It appears mkfn
  // simply handles processing the params
  // prior to invoking the js function and
  // passing the params in so it is
  // probably a bug in the original code
  // and the tests just aren't catching
  // it. All functions on base should have
  // the expectation that the parameters
  // are processed before calling.
  //
  // As an aside, this is where the
  // programming model will need to
  // improve in the future. Processing
  // ideally happens in a lazy way,
  // needing to process every parameter,
  // or any parameter, prior to passing
  // the context thread to the invoked
  // function will greatly hinder the
  // applications proformance, especially
  // at scale. It would be premature to
  // consider tackling this likly future
  // issue now, but just noting that lazy
  // evaluation is an enventual project
  // goal and it will likly have an effect
  // on what we are assuming here. In all
  // liklyhood the solution for this will
  // develop naturally overtime, and be
  // available when needed. Other
  // languages have already achevied such
  // fluidity in their programming models
  // and implementions, so it is certianly
  // at least theroretically possible.
  // Long live Bubblescript! 🐇

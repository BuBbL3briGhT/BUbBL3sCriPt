
class TokenNoMatchError extends Error {
  name = "NoMatchError";

  constructor(token){
    super("No match for token " +
      JSON.stringify(token));
  }
}

module.exports = {
  TokenNoMatchError
};

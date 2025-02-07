
class ParsingError extends Error { }

class NoMatchError extends ParsingError {
  constructor(message){
    super(message);
    this.name = "NoMatchError"
  }
}


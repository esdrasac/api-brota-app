class Validate {
  checkEmail(email) {
    return email.indexOf('@sga.pucminas.br');
  }
}

module.exports = new Validate();

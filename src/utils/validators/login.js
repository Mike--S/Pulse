export function required(value) {
  return !value ? ['This field cannot be empty'] : [];
}

export function validateLogin(value, loginField) {
  var regEXP;

  if (!value) {
    return ['пустое значение!'];
  }
  else {
    switch(loginField) {
      case 'login': {
        regEXP = /^[a-z|A-Z]{1}[\w|_]{2,20}$/g;
        return regEXP.test(value) ? [] : ['логин должен начинаться с буквы и быть длиной от 3 до 21'];
      }
        break;
      case 'password': {
        regEXP = /^\w{6,20}$/g;
        return regEXP.test(value) ? [] : ['от 6 до 20 символов'];
      }
        break;
    }
  }
}

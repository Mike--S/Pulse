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
        regEXP =/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        return regEXP.test(value) ? [] : ['неправильный почтовый адрес'];
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

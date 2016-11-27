export function required(value) {
  return !value ? ['This field cannot be empty'] : [];
}

export function validateAuth(value, authField) {
  var regEXP;

  if (!value) {
    return ['пустое значение!'];
  }
  else {
    switch(authField) {
      case 'email': {
        regEXP =/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        return regEXP.test(value) ? [] : ['неправильный почтовый адрес'];
      }
        break;
      case 'password': {
        regEXP = /^\w{6,20}$/g;
        return regEXP.test(value) ? [] : ['от 6 до 20 символов'];
      }
        break;
      case 'fio': {
        regEXP = /^\w{2,40}$/g;
        return regEXP.test(value) ? [] : ['от 2 до 40 символов'];
      }
        break;
      case 'code': {
        regEXP = /^\w{4,8}$/g;
        return regEXP.test(value) ? [] : ['от 4 до 8 символов'];
      }
        break;
    }
  }
}

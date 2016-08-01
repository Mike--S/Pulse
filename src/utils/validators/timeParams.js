export function required(value) {
  return !value ? ['This field cannot be empty'] : [];
}

export function validateTimeParams(name, value) {
  var regEXP;
  var paramName = name.split('_')[0];

  if (!value) {
    return [];
  }
  else {
    switch(paramName) {
      case 'AT': {
        regEXP = /^\d{2,3}\/\d{2}$/g;
        return regEXP.test(value) ? [] : ['неправильный формат данных, правильный - xx(x)/xx'];
      }
        break;
      case 'CHSS': {
        regEXP = /^\d{2,3}$/g;
        return regEXP.test(value) ? [] : ['неправильный формат данных, правильный - xx(x)'];
      }
        break;
      case 'BLOOD': {
        regEXP = /^\d{1,2}\.\d{1,2}$/g;
        return regEXP.test(value) ? [] : ['неправильный формат данных, правильный - x(x).x(x)'];
      }
        break;
    }
  }
}

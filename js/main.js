const showFunctionException = (min, max) => {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw 'Параметры функции должны быть числами';
  }

  if (min < 0 || max < 0) {
    throw 'Диапазон не может быть отрицательным';
  }

  if (min > max) {
    throw 'Неверный диапазон';
  }
};

const getRandomIntegerFromRange = (min = 0, max = 10) => {
  showFunctionException(min, max);

  if (min === max) {
    return Math.floor(min);
  }

  return Math.floor(min + Math.random() * (max + 1 - min));
};

const getTruncatedNumber = (num, lengthNumbersAfterDot) => {
  const BASE_DEGREE_NUMBER = 10;
  return Math.trunc(num * BASE_DEGREE_NUMBER ** lengthNumbersAfterDot) / BASE_DEGREE_NUMBER ** lengthNumbersAfterDot;
};

const getRandomFloatFromRange = (min = 0, max = 10, lengthNumbersAfterDot = 2) => {
  showFunctionException(min, max);

  let randomNumber = 0;

  if (min === max) {
    randomNumber = min;
  } else {
    randomNumber = min + Math.random() * (max - min);
  }

  return getTruncatedNumber(randomNumber, lengthNumbersAfterDot);
};


getRandomIntegerFromRange(1, 10);
getRandomFloatFromRange(1.11, 10.11, 3);


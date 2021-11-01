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

const getRandomiseArray = (array, countOfElements) => {
  const copyArray = array.slice();

  const result = [];
  while (copyArray.length > 0) {
    const random = getRandomIntegerFromRange(0, copyArray.length-1);
    const elem = copyArray.splice(random, 1)[0];
    result.push(elem);
  }

  return result.slice(0, countOfElements);
};

const onFailNotice = (message) => {
  const notice = document.createElement('div');
  notice.style.padding = '5px';
  notice.style.backgroundColor = 'red';
  notice.style.position = 'absolute';
  notice.style.top = '0';
  notice.style.left = '0';
  notice.style.right = '0';
  notice.style.color = 'white';
  notice.style.zIndex = '500';
  notice.style.fontSize = '13px';
  notice.style.textAlign = 'center';
  notice.textContent = message;
  document.querySelector('main').append(notice);
};

const successNode = document.querySelector('#success')
  .content.querySelector('.success')
  .cloneNode(true);

const errorNode = document.querySelector('#error')
  .content.querySelector('.error')
  .cloneNode(true);

const bodyElement = document.querySelector('body');

const showNotice = (node) => {
  const onWindowKeydown = (evt) => {
    if (evt.key === 'Escape') {
      node.remove();
      window.removeEventListener('keydown', onWindowKeydown);
    }
  };

  bodyElement.append(node);
  node.addEventListener('click', () => {
    node.remove();
    window.removeEventListener('keydown', onWindowKeydown);
  });

  window.addEventListener('keydown', onWindowKeydown);
};

const onSuccessNotice = () => showNotice(successNode);
const onErrorNotice = () => showNotice(errorNode);


export {
  getRandomIntegerFromRange,
  getRandomFloatFromRange,
  getRandomiseArray,
  onFailNotice,
  onSuccessNotice,
  onErrorNotice
};

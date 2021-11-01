const URL_GET_DATA = 'https://24.javascript.pages.academy/keksobooking/data';
const URL_SEND_DATA = 'https://24.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onFail) => {
  fetch(URL_GET_DATA)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}. Ошибка загрузки данных. Попробуйте обновить страницу`);
    })
    .then((data) => onSuccess(data))
    .catch(onFail);
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    URL_SEND_DATA,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        return;
      }
      throw new Error('Ошибка при отправке формы. Попробуйте еще раз');
    })
    .catch(onFail);
};

export {getData, sendData};

//import checkNumbInputs from './checkNumbInputs';

const forms = () => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          upload = document.querySelectorAll('[name=upload]');
// валидация, что вводишь
    // checkNumbInputs('input[name="user_phone"]');
// ответ после отправки формы, можно добавить картинки или анимацию
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро с вами свяжутся',
        failure: 'Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };
// инпуты(сообщения и картинки) идут на разные адреса
    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };

// добавили async/await, поэтому скрипт ждет ответ от сервера и let Не будет Undefined
    const postData = async (url, data) => {
        // fetch api, ждет пока отработает запрос и запишется в res
        let res = await fetch(url, {
            method: "POST",
            body: data
        });
// Тоже подождет получение ответа от сервера
        return await res.text();
    };
// очистка инпутов после использования
    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не выбран';
        });
    };
// Добавление названия файла при загрузки
    upload.forEach(item => {
        item.addEventListener('input', () => {
// item.files - Объект загруженного файла с свойствами и методами
            console.log(item.files[0]);
            let dots;
            const arr = item.files[0].name.split('.');
// Делим название на массив из названия и расширения
            arr[0].length > 5 ? dots='...' : dots='.';
            const name = arr[0].substring(0, 6) + dots + arr[1];
            item.previousElementSibling.textContent = name;
        });
    });

    form.forEach(item => {
// Обработчик для каждой формы
        item.addEventListener('submit', (event) => {
// для отмены перезагрузки страницы
            event.preventDefault();
// создаем блок для отображения Message
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
// Засовываем статус сообщение в родитель инпута
            item.parentNode.appendChild(statusMessage);
// скрываем форму со страницы, но не удаляем
            item.classList.add('animated', 'fadeOutUp');
// форма исчезает, чтобы страница не поплыла из-за наличия невидимого элемента
            setTimeout(() => {
                item.style.display = 'none';
            }, 400);

            let statusImg = document.createElement('img');
// добавляем путь до картинки-сообщения
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
// помещаем картинку внутрь созданного дива
            statusMessage.appendChild(statusImg);
// создаем див для тексти и помещаем внутрь того же дива под картинкой
            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

// Для получения всей инфу из инпутов в спец структуру FormData
            const formData = new FormData(item);
//чтобы сгенерировать динамический путь, куда все отправлять в зависимости от родителя формы
            let api;
            // ищет выше по иерирархии, выдаст тру если найдет и фолс если нет
            // условие или для понимания куда отправлять картинку, куда текст
            item.closest('.popup-design') || item.classList.contains('calc_form')? api = path.designer : api = path.question;
            console.log(api);
// вернется промис с сервера
            postData(api, formData)
                .then(res => {
                    // вывод массива отправленных текстовых данных
                    console.log(res);
                    statusImg.setAttribute('src', message.ok);
                    textMessage.textContent = message.success;
                })
                .catch(()=> {
                    statusImg.setAttribute('src', message.fail);
                    textMessage.textContent = message.failure;
                })
                .finally(()=>{
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeInUp');
                    }, 5000);
                });
        });
    });
};

export default forms;
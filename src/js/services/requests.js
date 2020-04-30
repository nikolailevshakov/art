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

const getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
};

export {postData, getResource};
/*
callback - функция обратного вызова, обработчик результата.

В качестве араметров принимает на вход результат успешного выполнения и ошибку.

пример: function cb(result, error) {
    // Тут работа с раезультатом и ошибкой
}
*/

function getAllTickers(callback) {
    apiClient.getRequest('/tickers/', callback);
}

function getMyCollection(callback) {
    apiClient.getRequest('/users/collection/', callback);
}

function addToMyCollection(data, callback) {
    apiClient.postRequest('/users/collection/', data, callback);
}

function deleteFromMyCollection(data, callback) {
    apiClient.postRequest('/users/collection/', data, callback);
}


/* Основная логика приложения  */

// Предзагрузка всех тикеров в комбобокс(селект)
getAllTickers((result,error) => {
    if (!error) {
        const tickersSelect = document.getElementById('tickerSelect');
        result.forEach(function(elem) {
            var theElement = document.createElement('option');
            theElement.textContent = elem['name'];
            theElement.value = elem['_id'];
            tickersSelect.appendChild(theElement);
        });
    } else {
        alert(error);
    }
})

/* Кнопки */

const btn_addToMyCollection = document.getElementById('btn_addToMyCollection');
const btn_getMyCollection = document.getElementById('btn_getMyCollection');
const btn_getAllTickers = document.getElementById('btn_getAllTickers');

btn_addToMyCollection.addEventListener('click', (e) => {
    e.preventDefault();
    const raw_form = document.forms.addTickerForm;
    addToMyCollection({tickerId:raw_form.tickerId.value, count_tickers: Number(raw_form.tickers_count.value)}, (result,error) => {
        if (!error) {
            alert(`Успех(тикер добавлен): ${JSON.stringify(result)}`);
        } else {
            alert(`Ошибка: ${JSON.stringify(error)}`);
        }
    })
})

btn_getMyCollection.addEventListener('click', (e) => {
    e.preventDefault();
    getMyCollection((result,error) => {
        if (!error) {
            alert(`Успех(коллекция получена): ${JSON.stringify(result)}`);
        } else {
            alert(`Ошибка: ${JSON.stringify(error)}`);
        }
    })
})

btn_getAllTickers.addEventListener('click', (e) => {
    e.preventDefault();
    getAllTickers((result,error) => {
        if (!error) {
            alert(`Успех(тикеры получены): ${JSON.stringify(result)}`);
        } else {
            alert(`Ошибка: ${JSON.stringify(error)}`);
        }
    })
})
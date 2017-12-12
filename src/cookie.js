/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', function() {
    filterCookies(filterNameInput.value);
});

addButton.addEventListener('click', () => {
});

filterCookies();

/**
 * Функция фильтрирует cookie соответственно значению тектового поля и показывает в таблице только те cookie,
 * в имени или значении которых есть введенное значение.
 * Если в поле фильтра пусто, то выводятся все доступные cookie
 *
 * @param {string} value - значению тектового поля
 */
function filterCookies(value) {
    let cookies = getCookiesObj();

    // Очищаем содержимое таблицы для вывода нового фильтрованного контента
    listTable.innerHTML = '';

    // Проходит по всем cookie
    Object.keys(cookies).forEach(item => {
        if (value == '' || value == undefined) {
            // Выводим в таблицу все cookie
            createCookieTableRow(item, cookies[item]);
        } else if (isMatching(cookies[item], value) || isMatching(item, value)) {
            // Выводим в таблицу только те cookie, в имени или значении которых есть введенное значение
            createCookieTableRow(item, cookies[item]);
        }
    });
}

/**
 * Функция собирает все cookies браузера в объект
 *
 * @returns {object}
 */
function getCookiesObj() {
    let allCookies = "wp-settings-time-1=1512993821; em_cdn_uid=t%3D1498133933182%26u%3Dd4a0191343b843c6afe0ab12ca51f137; _ga=GA1.1.1254560425.1498116515; em_p_uid=l:1500034320866|t:1498133933578|u:84202eca5ba040cbbbd28724835fafc1; __atuvc=0%7C41%2C0%7C42%2C0%7C43%2C0%7C44%2C27%7C45; zf_poll_vote_ans_mrbS9DB2MIK46pI4mLZZ6CF9G0OwE7lz=mrbS9DB2MIK46pI4mLZZ6CF9G0OwE7lz; zf_poll_vote_tvoImS9k4oBtZcWjN4Q4wrywS95Hd2qw=tvoImS9k4oBtZcWjN4Q4wrywS95Hd2qw; zf_poll_vote_ans_m1z46q67=m1z46q67; zf_poll_vote_n1730dr9=n1730dr9; PHPSESSID=g7rti0g3323m20laa7b8nf46i9";

    return allCookies // todo document.cookie
        .split('; ')
        .filter(Boolean)
        .map(cookie => cookie.match(/^([^=]+)=(.+)/))
        .reduce((obj, [, name, value]) => {
            obj[name] = value;

            return obj;
        }, {});
}

/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка происходит без учета регистра символов
 *
 * @param {string} full - исходная строка
 * @param {string} chunk - подстрока для стравнения
 * @returns {boolean}
 */
function isMatching(full, chunk) {
    return full.toLowerCase().includes(chunk.toLowerCase());
}

/**
 * Функция добовляет cookie в таблицу
 * Добавляет слушатель для удаления cookie из таблицы и браузера
 *
 * @param {string} name - имя cookie
 * @param {string} value - значение cookie
 */
function createCookieTableRow (name, value) {
    let row = document.createElement('tr'),
        td1 = document.createElement('td'),
        td2 = document.createElement('td'),
        td3 = document.createElement('td'),
        btn = document.createElement('button');

    td1.innerText = name;
    td2.innerText = value;
    btn.innerHTML = 'delete';

    // Добавление строки <tr> для cookie в таблицу
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    td3.appendChild(btn);
    listTable.appendChild(row);

    // Слушатель удаления cookie
    btn.addEventListener('click', () => {
        // Удалить cookie из браузера
        deleteCookie(name, value);

        // Удалить cookie из таблицы
        deleteCookieTableRow(btn);
    });
}

/**
 * Remove cookie from HTML table
 *
 * @param {object} elem - элемент внутри <td>
 */
function deleteCookieTableRow (elem) {
    let index = elem.parentNode.parentNode.rowIndex;

    listTable.deleteRow(index-1);
}
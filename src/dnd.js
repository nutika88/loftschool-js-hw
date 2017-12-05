/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {
    let div = document.createElement('div');

    function rndPos(pos) {
        return Math.floor(Math.random() * pos);
    }

    function rndSize(min, max) {
        return Math.floor(Math.random() * (max - min )) + min;
    }

    function rndColor() {
        return '#' + Math.floor(Math.random()*16777215).toString(16);
    }

    div.className = 'draggable-div';
    div.style.top = rndPos(document.body.clientHeight) + 'px';
    div.style.left = rndPos(document.body.clientWidth) + 'px';
    div.style.width = rndSize(20, 100) + 'px';
    div.style.height = rndSize(20, 100) + 'px';
    div.style.position = 'absolute';
    div.style.backgroundColor = rndColor();

    return div;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {
    target.addEventListener('mousedown', function(event) {
        event.preventDefault();

        let shiftX = event.clientX - target.getBoundingClientRect().left;
        let shiftY = event.clientY - target.getBoundingClientRect().top;

        target.style.position = 'absolute';
        target.style.zIndex = 1000;

        moveAt(event.pageX, event.pageY);

        // centers the target at (pageX, pageY) coordinates
        function moveAt(pageX, pageY) {
            target.style.left = pageX - shiftX + 'px';
            target.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        // move the target on mousemove
        document.addEventListener('mousemove', onMouseMove);

        // drop the target, remove unneeded handlers
        target.addEventListener('mouseup', function() {
            document.removeEventListener('mousemove', onMouseMove);
            target.onmouseup = null;
        });
    });
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};

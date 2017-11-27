/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
    let res = [];

    for (let i = 0; i < array.length; i++) {
        res.push(fn(array[i], i, array));
    }

    return res;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
    let i = 0;

    if (initial === undefined) {
        i = 1;
        initial = array[0];
    }

    for (i; i < array.length; i++) {
        initial = fn(initial, array[i], i, array);
    }

    return initial;
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходимо удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
    delete obj[prop];
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
    let res = false;

    if (obj.hasOwnProperty(prop)) {
        res = true;
    }

    return res;
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
    return Object.keys(obj);
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
    let propArray = Object.keys(obj);

    return propArray.map(function (el) {
        return el.toUpperCase()
    });
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from = 0, to = array.length) {
    let res = [],
        len = array.length;

    function indexCorrector(index) {
        if (index >= len) {
            index = len;
        } else if (index < 0) {
            index += len;

            if (Math.abs(index) > len) {
                index = 0;
            }
        }

        return index;
    }

    if (typeof array === 'undefined' || !(array instanceof Array)) {
        throw new TypeError('Cannot read property \'slice\' of undefined');
    }

    to = indexCorrector(to);
    from = indexCorrector(from);

    for (let i = from; i < to; i++) {
        res.push(array[i]);
    }

    return res;
}

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    return new Proxy(obj, {
        set(obj, prop, val) {
            obj[prop] = Math.pow(val, 2);

            return true;
        }
    });
}

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};
/* ДЗ 1 - Функции */

/*
 Задание 1:

 Функция должна принимать один аргумент и возвращать его
 */
function returnFirstArgument(arg) {
	return arg;
}

/*
 Задание 2:

 Функция должна принимать два аргумента и возвращать сумму переданных значений
 Значение по умолчанию второго аргумента должно быть 100
 */
function defaultParameterValue(a, b = 100) {
	return a + b;
}

/*
 Задание 3:

 Функция должна возвращать все переданные в нее аргументы в виде массива
 Количество переданных аргументов заранее неизвестно
 */
function returnArgumentsArray() {
	var argsArray = [];
	
	for( var i = 0; i < arguments.length; i++ ){
        argsArray.push(arguments[i]);
	}
	
	return argsArray;
}

/*
 Задание 4:

 Функция должна принимать другую функцию и возвращать результат вызова переданной функции
 */
function returnFnResult(fn) {
	return fn();
}

/*
 Задание 5:

 Функция должна принимать число (значение по умолчанию - 0) и возвращать функцию (F)
 При вызове F, переданное число должно быть увеличено на единицу и возвращено из F
 */
function returnCounter(number = 0) {
	function F(){
        return ++number;
    }

	return F;
}

/*
 Задание 6 *:

 Функция должна принимать другую функцию (F) и некоторое количество дополнительных аргументов
 Функция должна привязать переданные аргументы к функции F и вернуть получившуюся функцию
 */
function bindFunction(fn) {
	let args = [];
	
	// Собираем аргументы без fn
	for(let i = 0; i < arguments.length; i++){
		if(typeof arguments[i] !== "function"){
			args.push(arguments[i]);
		}						
	}

	return function(){
		let additional = [];
		
		// Собираем аргументы функции
		for(let i = 0; i < arguments.length; i++){				
			additional.push(arguments[i]);										
		}
		
		// Перевязка переданных атрибутов
		// Передаём null так как не используем перевязку контекста		 
		return fn.apply(null, args.concat(additional));
	}
	
	// Вариант с использованием slice :)
	/*
	let args = Array.prototype.slice.call(arguments, 1);
	return function() {
	  let additional = Array.prototype.slice.call(arguments, 0);
	  return fn.apply(null, args.concat(additional));
	};
	*/
}

export {
    returnFirstArgument,
    defaultParameterValue,
    returnArgumentsArray,
    returnFnResult,
    returnCounter,
    bindFunction
}
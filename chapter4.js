console.log('Chapter 4. Excercises');

//#region Chapter 4.1 Сумма диапазона 
// Напишите функцию range, которая принимает два аргумента, start и end,
// и возвращает массив, содержащий все числа от start до end включительно.

// Затем напишите функцию sum, которая принимает массив чисел и возвращает их сумму. 
// Запустите пример программы и посмотрите, действительно ли она возвращает 55. 

// В качестве дополнительного задания: измените функцию range так, чтобы
// она принимала необязательный третий аргумент, который указывал бы
// значение шага, используемое при построении массива. Если шаг не задан,
// элементы увеличиваются на единицу, что соответствует старому поведению.
// Вызов функции range(1, 10, 2) должен возвращать [1, 3, 5, 7, 9]. Убедитесь,
// что функция также работает и с отрицательными значениями шага, так что
// результатом range(5, 2, -1) является [5, 4, 3, 2]. 

console.log('=== Chapter 4.1 Сумма диапазона');
function range(start, end, step = 1) {
  let array = [];
  if (step === 0) return array;
  if (start <= end) {
    if (step < 0) step *= -1;
    for (let i = start; i <= end; i += step) {
      array.push(i);
    }
  } else {
    if (step > 0) step *= -1;
    for (let i = start; i >= end; i += step) {
      array.push(i);
    }
  }
  return array;
}
function sum(arr) {
  return arr.reduce((acc, i) => acc + i);
}

console.log(range(0, 0));                     // [0]
console.log(range(2, 7));                     // [2, 3, 4, 5, 6, 7]
console.log(range(7, 2));                     // [7, 6, 5, 4, 3, 2]
console.log(range(1, 10, 2));                 // [1, 3, 5, 7, 9]
console.log(range(10, 1, -2));                // [10, 8, 6, 4, 2]

console.log(range(1, 2, 0));                  // []
console.log(range(1, 11, -2.5));              // [1, 3.5, 6, 8.5, 11]

console.log(sum(range(1, 10)));               // 55
console.log(sum(range(1, 10, 1)));            // 55
console.log(sum(range(7, -6)));               // 7  
//#endregion

//#region Chapter 4.2 Массив в обратном порядке
// Напишите две функции: reverseArray и reverseArrayInPlace. 
// Первая функция, reverseArray, принимает массив в качестве аргумента 
// и создает новый массив, содержащий те же элементы в обратном порядке. 
// Вторая, reverseArrayInPlace, делает то же, что и метод reverse: 
// преобразовывает массив, заданный в качестве аргумента, меняя порядок 
// следования его элементов на обратный. Не используйте для этого
// стандартный метод reverse. 
console.log('=== Chapter 4.2 Массив в обратном порядке');
function reverseArray(arr) {
  let reverseArray = [];
  arr.map(item => reverseArray.unshift(item));
  return reverseArray;
}
function reverseArrayInPlace(arr) {
  let reverseArray = [];
  arr.map(item => reverseArray.unshift(item));
  for (i in arr) {
    arr[i] = reverseArray[i];
  }
}

// Book version 
// function reverseArrayInPlace(array) {
//   for (let i = 0; i < Math.floor(array.length / 2); i++) {
//     let old = array[i];
//     array[i] = array[array.length - 1 - i];
//     array[array.length - 1 - i] = old;
//   }
//   return array;
// }

let array = [1, 2, 3, 4, 5];

console.log(reverseArray(["A", "B", "C"]));             // ["C", "B", "A"]
console.log('array = ', array);                         // [1, 2, 3, 4, 5]
console.log('reverseArray = ', reverseArray(array));    // [5, 4, 3, 2, 1]
reverseArrayInPlace(array);
console.log('reverseArrayInPlace array = ', array);     // [5, 4, 3, 2, 1]
//#endregion

//#region Chapter 4.3 Список
// Напишите функцию arrayToList, которая строит список, чья структура
// подобна показанной, если передать функции массив [1, 2, 3] в качестве
// аргумента. Напишите также функцию listToArray, создающую массив из
// списка. Затем добавьте вспомогательную функцию prepend, принимающую
// элемент и список и создающую новый список, в котором заданный элемент
// добавлен в начало исходного списка. Кроме того, создайте функцию nth,
// принимающую список и число и возвращающую элемент, находящийся в заданной 
// позиции в этом списке (где ноль соответствует первому элементу),
// или undefined, если элемента в заданной позиции не существует.
// Если вам этого все еще недостаточно, напишите рекурсивную версию функции nth. 
console.log('=== Chapter 4.3 Список');
function arrayToList(array) {
  let list = null;
  array.reverse().map(item => (list = { value: item, rest: list }));
  return list;
}
// option 1
function listToArray(list, array = []) {
  array.push(list.value);
  if (list.rest !== null) {
    return listToArray(list.rest, array);
  }
  return array;
}
// option 2
// function listToArray(list) {
//   let arr = [];
//   for (let node = list; node; node = node.rest) {
//     arr.push(node.value);
//   }
//   return arr;
// }
function prepend(value, list) {
  return { value: value, rest: list };
}
function nth(list, num) {
  if (num === 0) {
    return list.value;
  } else if (list.rest !== null) {
    return nth(list.rest, num - 1);
  }
}

console.log(arrayToList([10, 20, 30]));
// {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));    // [10, 20, 30]
console.log(prepend(15, prepend(25, null)));
// {value: 15, rest: {value: 25, rest: null}}
console.log(prepend(5, arrayToList([10, 20])));
// {value: 5, rest: {value: 10, rest: {value: 20, rest: null}}}
console.log(nth(arrayToList([10, 20, 30]), 1));         // 20
console.log(nth(arrayToList([10, 20, 30]), 13));        // undefined
//#endregion

//#region Chapter 4.4 
console.log('=== Chapter 4.4 ');
//#endregion
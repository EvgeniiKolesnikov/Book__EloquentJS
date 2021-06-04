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

let array = [1, 2, 3, 4, 5];

console.log(reverseArray(["A", "B", "C"]));             // ["C", "B", "A"]
console.log('array = ', array);                         // [1, 2, 3, 4, 5]
console.log('reverseArray = ', reverseArray(array));    // [5, 4, 3, 2, 1]
reverseArrayInPlace(array);
console.log('reverseArrayInPlace array = ', array);     // [5, 4, 3, 2, 1]
//#endregion

//#region Chapter 4.3
console.log('=== Chapter 4.3 ');
//#endregion

//#region Chapter 4.4 
console.log('=== Chapter 4.4 ');
//#endregion
console.log('Chapter 5. Excercises');

//#region Chapter 5.1 Свёртка
// Используйте метод reduce в комбинации с concat для свёртки массива
// массивов в один массив, у которого есть все элементы входных массивов
console.log('=== Chapter 5.1 Свёртка');
let arrays = [[1, 2, 3], [4, 5], [6]];
console.log(arrays.reduce((a, b) => (a.concat(b))));
// → [1, 2, 3, 4, 5, 6]
//#endregion

//#region Chapter 5.2 Ваш собственный цикл 
// Напишите функцию высшего порядка loop, которая представляет собой аналог 
// оператора цикла for. Она принимает значение, функцию условия, функцию 
// обновления и функцию тела. На каждой итерации сначала выполняется
// функция условия для текущего значения цикла. Если эта функция возвращает
// false, то выполнение цикла прекращается. Затем вызывается функция тела,
// которой передается текущее значение цикла. Наконец, вызывается функция
// обновления для создания нового значения, и цикл запускается сначала.
// При определении функции вы можете использовать обычный цикл для
// перебора значений. 
console.log('=== Chapter 5.2 Ваш собственный цикл');
function loop(value, condition, update, body) {
  for (value; condition(value); value = update(value)) body(value)
}
loop(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1
//#endregion

//#region Chapter 5.3 Метод every
// Реализуйте метод every, принимающий в качестве параметров 
// массив и предикативную функцию. Напишите две версии: 
// • одну с использованием цикла,
// • вторую - с применением метода some
console.log('=== Chapter 5.3 Метод every');
function every(array, test) {
  console.log(array);
  let status = true;
  for (let value of array) {
    if (!test(value)) {
      status = false;
      break;
    } else status = true;
  }
  return status;
}
console.log(every([1, 3, 5], n => n < 10));   // → true
console.log(every([2, 4, 16], n => n < 10));  // → false
console.log(every([], n => n < 10));          // → true

function everySome(array, test) {
  console.log(array);
  let status = true;
  status = !array.some(item => !test(item))
  return status;
}
console.log(every([1, 3, 5], n => n < 10));   // → true
console.log(every([2, 4, 16], n => n < 10));  // → false
console.log(every([], n => n < 10));          // → true
//#endregion
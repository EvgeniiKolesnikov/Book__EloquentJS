console.log('Chapter 2. Excercises');

//#region Chapter 2.1 Построение треугольника в цикле 
// Напишите цикл, который делает семь вызовов console.log 
// и выводит следующий треугольник:
// #
// ##
// ###
// ####
// #####
// ######
// #######
console.log('=== Chapter 2.1 Построение треугольника в цикле');
for (let i = '#'; i.length <= 7; i += '#') {
  console.log(i);
}
//#endregion

// #region Chapter 2.2 FizzBuzz 
// Напишите программу, в которой с помощью console. log 
// выводятся все числа от 1 до 100 с двумя исключениями. 
// Для чисел, кратных 3, вместо числа
// выводится "Fizz", а для чисел, кратных 5 (но не 3), - "Buzz".
// Когда это заработает, измените программу так, чтобы она печатала "FizzBuzz"
// для чисел, которые делятся и на 3, и на 5 (и по-прежнему печатайте "Fizz"
// или "Buzz" для чисел, кратных только одному из них). 
console.log('=== Chapter 2.2 FizzBuzz');
for (let i = 1; i <= 100; i++) {
  if (i%5 === 0 && i%3 === 0) {
    console.log('FizzBuzz');
  } else if (i%3 === 0 && i%5 !== 0) {
    console.log('Fizz');
  } else if (i%5 === 0 && i%3 !== 0) {
    console.log('Buzz');
  } else {
    console.log(i);
  }
}
//#endregion

// #region Chapter 2.3 Шахматная доска
// Напишите программу, которая создает строку, 
// представляющую сетку 8 х 8, используя для разделения строк символы новой строки. 
// В каждой позиции сетки стоит либо пробел, либо символ"#". 
// Эти символы должны располагаться в шахматном порядке. 
// Передавая данную строку в console. log, вы должны получить что-то вроде
// этого:
// # # # #
// # # # #
// # # # #
// # # # #
// # # # #
// # # # #
// # # # #
// # # # #
// Если вы уже написали программу, которая генерирует этот узор, определите
// привязку size = 8 и измените программу так, чтобы она работала для любого
// size, выводя сетку заданных ширины и высоты. 
console.log('=== Chapter 2.3 Шахматная доска');
function createChessboard(size, cellA, cellB) {
  console.log(`Chessboard size = ${size}`);
  if (cellA === undefined) cellA = ' ';
  if (cellB === undefined) cellB = '#';
  for (let i = 0; i < size; i++) {
    if (i % 2 === 0) {
      createLine(cellA, cellB, size);
    } else {
      createLine(cellB, cellA, size);
    }
  }
  function createLine(cellA, cellB, size) {
    let line = '';
    for (let i = 0; i < size; i++) {
      if (i % 2 === 0) {
        line += cellA;
      } else {
        line += cellB;
      }
    }
    console.log(line);
  }
}
createChessboard(8);
createChessboard(4, '☐', '☒');
createChessboard(3, '-', '•');
//#endregion
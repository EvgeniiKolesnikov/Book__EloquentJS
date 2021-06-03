console.log('Chapter 3. Excercises');

//#region Chapter 3.1 Минимум
// Напишите функцию min, которая принимает два
// аргумента (или более) и возвращает их минимум
console.log('=== Chapter 3.1 Минимум');
function min(...nums) {
  let min = nums[0];
  for (const num of nums) {
    if (num<min) {
      min = num;
    }
  }
  return min;
}
console.log(`min = ${min(1,2,3,0,-5,13)}`);
//#endregion

//#region Chapter 3.2 Рекурсия
// ноль четный;
// единица нечетная;
// четность любого другого числа N совпадает с четностью N - 2.

// Определите рекурсивную функцию isEven, соответствующую этому описанию. 
// Функция должна принимать один параметр (положительное целое число) 
// и возвращать логическое значение.
// Проверьте эту функцию на числах 50 и 75. Посмотрите, как она ведет себя
// для -1. Почему? Можете ли вы придумать способ, как это исправить?
console.log('=== Chapter 3.2 Рекурсия');
function isEven(n) {
  // console.log(n);
  if (n === 0) return true;
  if (n === 1) return false;
  if (n>0) {
    return isEven(n-2);
  } else {
    return isEven(n+2);
  }
}
console.log(isEven(50));      // → true
console.log(isEven(75));      // → false
console.log(isEven(1));       // → false
console.log(isEven(0));       // → true   
console.log(isEven(-1));      // → false
console.log(isEven(-2));      // → true 
//#endregion

//#region Chapter 3.3 Подсчет букв 
// Напишите функцию countBs, которая принимает строку в качестве
//  единственного аргумента и возвращает число, показывающее, сколько больших
// букв ~в~ содержится в этой строке.
// Затем напишите функцию countChar, которая ведет себя как countBs, 
// за исключением того, что принимает второй аргумент, указывающий, 
// какие именно символы нужно посчитать (вместо того чтобы считать только большие
// буквы ~в~). Перепишите countBs, чтобы использовать эту новую функцию. 
console.log('=== Chapter 3.3 Подсчет букв ');
function countChar(string, char) {
  console.log(`Sentence = '${string}' \nDesired Char = '${char}'`);
  let countChar = 0;
  for (let i = 0; i < string.length; i++) {
    if (string[i] === char) {
      countChar++;
    }
  }
  return countChar;
}
console.log(`countChar = ${countChar('Very Beautiful Borsh', 'B')}`);
console.log(`countChar = ${countChar('Bye, baby', 'b')}`);
console.log(`countChar = ${countChar('bubbles')}`);
//#endregion
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
console.log('=== Chapter 3.2 Рекурсия');
function isEven(n) {

}
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
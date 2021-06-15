console.log('Chapter 9. Excercises');
//#region Chapter 9.1 Rеgехр-гольф
// Для каждого из следующих элементов напишите регулярное выражение,
// позволяющее проверить, встречается ли в строке какая-либо из указанных
// подстрок. Регулярное выражение должно соответствовать только строкам,
// содержащим одну из описанных подстрок. Не беспокойтесь о границах слов,
// если явно не указано иное. Когда ваше выражение сработает, проверьте,
// нельзя ли сделать его еще короче. 
// 1. car и cat.
// 2. рор и prop.
// 3. ferret, ferry и ferrari.
// 4. Любое слово, оканчивающееся на ious.
// 5. Пробельный символ, за которым следуют точка, запятая, двоеточие или
// точка с запятой. 
// 6. Слово длиннее шести букв.
// 7. Слово без буквы е (или Е). 
console.log('=== Chapter 9.1 Rеgехр-гольф');
// Fill in the regular expressions
verify(/ca[rt]/,
  ["my car", "bad cats"],
  ["camper", "high art"]);

verify(/pr?op/,
  ["pop culture", "mad props"],
  ["plop", "prrrop"]);

verify(/ferr(et|y|ari)/,
  ["ferret", "ferry", "ferrari"],
  ["ferrum", "transfer A"]);

verify(/ious\b/,
  ["how delicious", "spacious room"],
  ["ruinous", "consciousness"]);

verify(/\s[.,:;]/,
  ["bad punctuation ."],
  ["escape the period"]);

verify(/\w{7}/,
  ["Siebentausenddreihundertzweiundzwanzig"],
  ["no", "three small words"]);

verify(/\b[^\We]+\b/i,
  ["red platypus", "wobbling nest"],
  ["earth bed", "learning ape", "BEET"]);

function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  if (regexp.source == "...") return;
  for (let str of yes) {
    if (!regexp.test(str)) {
      console.log(`Failure to match '${str}'`);
    }
  }
  for (let str of no) {
    if (regexp.test(str)) {
      console.log(`Unexpected match for '${str}'`);
    }
  }
}
//#endregion

//#region Chapter 9.2 Стиль цитирования
// Представьте, что вы написали рассказ и использовали одинарные кавычки
// для обозначения прямой речи. Теперь вы хотите заменить все кавычки
// в диалогах двойными кавычками, сохраняя при этом одинарные кавычки,
// примененные в качестве апострофов, как в слове Д'Артаньян.
// Подумайте, как сделать шаблон, который бы различал эти два вида 
// использования кавычек, и создайте вызов метода replace, который бы выполнял
// правильную замену
console.log('=== Chapter 9.2 Стиль цитирования');
let text = "'I'm the cook,' he said, 'it's my job.'";
// Change this call.
console.log(text.replace(/(^|\W)'|'(\W|$)/g, '$1"$2'));
// → "I'm the cook," he said, "it's my job."
//#endregion

//#region Chapter 9.3 Снова числа
// Напишите выражение, которое выбирало бы только числа в стиле JavaScript.
// В нем должен учитываться необязательный знак •минус• или •плюс• перед
// числом, десятичная точка и обозначение показателя степени, как в Se-3 или
// 1Е10, также с необязательным знаком перед показателем степени. Кроме того,
// обратите внимание, что в числе могут отсутствовать цифры перед точкой
// или после нее, но число не может представлять собой только одну точку.
// Другими словами, .5 и 5. представляет собой правильную запись чисел в JS, а
// одиночная точка - нет.
console.log('=== Chapter 9.3 Снова числа');
// Fill in this regular expression.
let number = /^[+\-]?(\d+(\.\d*)?|\.\d+)([eE][+\-]?\d+)?$/;
// Tests:
for (let str of ["1", "-1", "+15", "1.55", ".5", "5.", "1.3e2", "1E-4", "1e+12"]) {
  if (!number.test(str)) {
    console.log(`Failed to match '${str}'`);
  }
}
for (let str of ["1a", "+-1", "1.2.3", "1+1", "1e4.5", ".5.", "1f5", "."]) {
  if (number.test(str)) {
    console.log(`Incorrectly accepted '${str}'`);
  }
}
//#endregion
console.log('Chapter 9. Excercises');
//#region Chapter 9.1
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
console.log('=== Chapter 9.1');
// Fill in the regular expressions

verify(/car|cat/,
  ["my car", "bad cats"],
  ["camper", "high art"]);

verify(/pop|prop/,
  ["pop culture", "mad props"],
  ["plop", "prrrop"]);

verify(/ferret|ferry|ferrari/,
  ["ferret", "ferry", "ferrari"],
  ["ferrum", "transfer A"]);

verify(/.../,
  ["how delicious", "spacious room"],
  ["ruinous", "consciousness"]);

verify(/.../,
  ["bad punctuation ."],
  ["escape the period"]);

verify(/.../,
  ["Siebentausenddreihundertzweiundzwanzig"],
  ["no", "three small words"]);

verify(/.../,
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

//#region Chapter 9.2
console.log('=== Chapter 9.2');
//#endregion

//#region Chapter 9.3
console.log('=== Chapter 9.3');
//#endregion
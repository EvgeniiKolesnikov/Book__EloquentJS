console.log('Chapter 12. Excercises');
// Chapter 12 excercises = CopyPaste book code... 
// I don't want to break my brain about it

//#region Chapter 12.1 Массивы 
// Дополните Egg поддержкой массивов, добавив в верхнюю область 
// идимости следующие три функции: array( ... values) для создания массива,
// содержащего значения аргументов, length(array) для получения длины 
// массива и element(array, n), чтобы получить n-й элемент массива
console.log('=== Chapter 12.1 Массивы');
topScope.array = (...values) => values;

topScope.length = array => array.length;

topScope.element = (array, i) => array[i];

run(`
do(define(sum, fun(array,
    do(define(i, 0),
        define(sum, 0),
        while(<(i, length(array)),
          do(define(sum, +(sum, element(array, i))),
            define(i, +(i, 1)))),
        sum))),
  print(sum(array(1, 2, 3))))
`);
// → 6
//#endregion

//#region Chapter 12.3 Комментарии 
// Было бы хорошо, если бы в Egg можно было писать комментарии. 
// Например, всякий раз, когда в коде встретится символ ~решетка~(#), 
// мы можем рассматривать оставшуюся часть строки как комментарий 
// и игнорировать его, как в JavaScript.
// Для того чтобы это реализовать, не нужно вносить большие изменения
// в синтаксический анализатор. Мы можем просто изменить skipSpace, 
// чтобы пропускать комментарии, как если бы они были пробелами, чтобы все
// точки, где вызывается skipSpace, теперь пропускали также и комментарии.
// Внесите это изменение. 
console.log('=== Chapter 12.3 Комментарии');
function skipSpace(string) {
  let skippable = string.match(/^(\s|#.*)*/);
  return string.slice(skippable[0].length);
}
console.log(parse("# hello\nx"));
// → {type: "word", name: "x"}
console.log(parse("a # one\n   # two\n()"));
// → {type: "apply",
//    operator: {type: "word", name: "a"},
//    args: []}
//#endregion

//#region Chapter 12.4 Исправление области видимости
// Добавьте специальную форму set, аналогичную define, которая назначает
// привязке новое значение, обновляя привязку во внешней области видимости, 
// если она еще не существует во внутренней области. Если привязка
// вообще не определена, должно генерироваться исключение ReferenceError
// (еще один стандартный тип ошибки). 
console.log('=== Chapter 12.4 Исправление области видимости');
specialForms.set = (args, env) => {
  if (args.length != 2 || args[0].type != "word") {
    throw new SyntaxError("Bad use of set");
  }
  let varName = args[0].name;
  let value = evaluate(args[1], env);

  for (let scope = env; scope; scope = Object.getPrototypeOf(scope)) {
    if (Object.prototype.hasOwnProperty.call(scope, varName)) {
      scope[varName] = value;
      return value;
    }
  }
  throw new ReferenceError(`Setting undefined variable ${varName}`);
};
run(`
do(define(x, 4),
  define(setx, fun(val, set(x, val))),
  setx(50),
  print(x))
`);
// → 50
run(`set(quux, true)`);
// → Some kind of ReferenceError
//#endregion
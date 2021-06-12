console.log('Chapter 8. Excercises');
//#region Chapter 8.1 Повторная попытка
// Представьте, что у вас есть функция primitiveMultiply, которая 
// в 20 % случаев умножает два числа, а в остальных 80 % случаев 
// возникает исключение
// типа MultiplicatorUnitFailure. Напишите функцию, оборачивающую эту
// неуклюжую функцию и просто продолжающую попытки до тех пор, пока
// вызов не завершится успешно, после чего возвращающую результат.
// Убедитесь, что вы обрабатываете только те исключения, которые 
// рассчитываете обработать. 
console.log('=== Chapter 8.1 Повторная попытка');
class MultiplicatorUnitFailure extends Error {}
function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}
function reliableMultiply(a, b) {
  try {
    return primitiveMultiply(a, b);
  }
  catch {
    return reliableMultiply(a, b);
  }
}
console.log(reliableMultiply(8, 8));      // → 64
//#endregion

//#region Chapter 8.2 Запертый ящик
// Рассмотрим следующий объект:
// const box = {
//   locked: true,
//   unlock() { this.locked = false; },
//   lock() { this.locked = true;  },
//   _content: [],
//   get content() {
//     if (this.locked) throw new Error("Locked!");
//     return this._content;
//   }
// };
// Это ящик с замком. В ящике есть массив, но его можно получить, только
// если отпереть ящик. Прямой доступ к частному свойству _content запрещен.
// Нацишите функцию withBoxUnlocked, которая принимает в качестве аргумента функциональное значение, отпирает ящик, запускает функцию, а затем
// гарантирует, что прежде, чем завершить работу, ящик снова будет заперт
// независимо от того, возвратила функция-аргумент нормальный результат
// или вызвала исключение.
// Если хотите заработать дополнительные баллы, убедитесь, что при вызове
// withBoxUnlocked, когда ящик уже открыт, он остается открытым
console.log('=== Chapter 8.2 Запертый ящик');
"use strict";
const box = {
  locked: true,
  unlock() { this.locked = false; },
  lock() { this.locked = true;  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
};

"use strict";
function withBoxUnlocked(body) {
  // Your code here.
  console.log('box before = ', box);
  const boxWasLocked = box.locked;
  if (boxWasLocked) {
    box.unlock();
  }
  try {
    body();
  } finally {
    if (boxWasLocked) {
      box.lock();
    }
    console.log('box after = ', box);
  }
}

withBoxUnlocked(function () {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(function () {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised: " + e);
}

console.log(box.locked); // → true
//#endregion
console.log('Chapter 11. Excercises');
// Chapter 11 excercises = CopyPaste book code... 
// I don't want to break my brain about it

//#region Chapter 11.1 Где скальпель? 
// У деревенских ворон есть старый скальпель, который они иногда 
// используют для специальных целей - например, чтобы прорезать двери 
// или что-то упаковать. Чтобы можно было быстро найти скальпель аждый раз, 
// когдаего перемещают в другое гнездо, в хранилище того гнезда, откуда 
// его взяли,и гнезда, его забравшего, добавляется запись под названием
//  "scalpel ", значением которой является информация о новом 
// местоположении скальпеля.
// Таким образом, чтобы найти скальпель, нужно проследить ряд записей
// в хранилищах, пока не будет найдено гнездо, хранящее указание на то 
// гнездо, где в данный момент находится скальпель.
// Напишите асинхронную функцию locateScalpel, которая это делает, начиная 
// с того гнезда, в котором она выполняется. Для доступа к хранилищу
// в произвольном гнезде можете использовать определенную ранее функцию
// anyStorage. Скальпель передается между гнездами достаточно давно; 
// возможно, в хранилище каждого гнезда есть запись "scalpel ".
// Затем напишите такую же функцию, не используя async и await. 
console.log('=== Chapter 11.1 Где скальпель? ');
async function locateScalpel(nest) {
  let current = nest.name;
  for (;;) {
    let next = await anyStorage(nest, current, "scalpel");
    if (next == current) return current;
    current = next;
  }
}
function locateScalpel2(nest) {
  function loop(current) {
    return anyStorage(nest, current, "scalpel").then(next => {
      if (next == current) return current;
      else return loop(next);
    });
  }
  return loop(nest.name);
}

locateScalpel(bigOak).then(console.log);    // → Butcher's Shop
locateScalpel2(bigOak).then(console.log);   // → Butcher's Shop
//#endregion

//#region Chapter 11.2 Построение Promise.all 
// Для заданного массива промисов Promise.all возвращает 
// промис, который ожидает завершения всех промисов в массиве.
// Метод успешен, если
// получаем массив значений результатов. Если один из промисов в массиве 
// не выполнится, то промис, возвращаемый all, также не выполнится, 
// и причиной отказа итогового промиса будет причина отказа невыполненного
// промиса из массива.
// Реализуйте нечто подобное самостоятельно в виде обычной функции
// с именем Promise_all.
console.log('=== Chapter 11.2 Построение Promise.all');
function Promise_all(promises) {
  return new Promise((resolve, reject) => {
    let results = [];
    let pending = promises.length;
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(result => {
        results[i] = result;
        pending--;
        if (pending == 0) resolve(results);
      }).catch(reject);
    }
    if (promises.length == 0) resolve(results);
  });
}

// Test code.
Promise_all([]).then(array => {
  console.log("This should be []:", array);
});
function soon(val) {
  return new Promise(resolve => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}
Promise_all([soon(1), soon(2), soon(3)]).then(array => {
  console.log("This should be [1, 2, 3]:", array);
});
Promise_all([soon(1), Promise.reject("X"), soon(3)]).then(array => {
  console.log("We should not get here");
}).catch(error => {
  if (error != "X") {
    console.log("Unexpected failure:", error);
  }
});
//#endregion

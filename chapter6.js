console.log('Chapter 6. Excercises');

//#region Chapter 6.1.1 Тип вектора (Книга 3) 
// • Напишите класс Vec, который представляет вектор в двумерном пространстве.
// Вектор принимает параметры х и у (числа) и сохраняет их в свойствах
// с тем же именем. 
// • Напишите для прототипа Vec два метода, plus и minus, которые принимают
// в качестве параметра другой вектор и возвращают новый вектор, представляющий 
// собой сумму или разность значений х и у для двух векторов (this
// и параметра).
// • Добавьте в прототип свойство-геттер length, которое вычисляет длину
// вектора - расстояние от точки (х, у) до начала координат (О, О). 
console.log('=== Chapter 6.1.1 Тип вектора (Книга 3) - классы');
class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  plus(vector) {
    return new Vec(this.x + vector.x, this.y + vector.y);
  }
  minus(vector) {
    return new Vec(this.x - vector.x, this.y - vector.y);
  }
  get length() {
    return Math.abs(Math.sqrt(this.x * this.x + this.y * this.y)).toFixed(2);
  }
}

let a = new Vec(0, 1);
let b = new Vec(2, 7);
let c = a.plus(b);
let d = a.minus(b);

console.log(  'a =', a, ', length =', a.length, '\nb =', b, ', length =', b.length,
            '\nc =', c, ', length =', c.length, '\nd =', d, ', length =', d.length);
//#endregion


//#region Chapter 6.1.2 Тип вектора (Книга 2) 
// Напишите конструктор Vector, представляющий вектор в двумерном
// пространстве. Он принимает параметры x и y (числа), которые хранятся в
// одноимённых свойствах.
// Дайте прототипу Vector два метода, plus и minus, которые принимают другой
// вектор в качестве параметра, и возвращают новый вектор, который хранит в
// x и y сумму или разность двух (один this, второй — аргумент)
// Добавьте геттер length в прототип, подсчитывающий длину вектора –
// расстояние от (0, 0) до (x, y).
console.log('=== Chapter 6.1.2 Тип вектора (Книга 2) - прототипы');
function Vector(x, y) {
  this.x = x;
  this.y = y;
}

Vector.prototype.plus = function(vector) {
  return new Vector(this.x + vector.x, this.y + vector.y);
};
Vector.prototype.minus = function(vector) {
  return new Vector(this.x - vector.x, this.y - vector.y);
};

Object.defineProperty(Vector.prototype, "length", {
  get: function() { return Math.abs(Math.sqrt(this.x * this.x + this.y * this.y)); }
});

let vectorA = new Vector(1, 2);
let vectorB = new Vector(2, 3);
let vectorC = vectorA.plus(vectorB);
let vectorD = vectorA.minus(vectorB);

console.log('vector A =', vectorA);
console.log('vector B =', vectorB);
console.log('vector C =', vectorC);
console.log('vector D =', vectorD);

console.log(new Vector(1, 2).plus(new Vector(2, 3)));   // → Vector{x: 3, y: 5}
console.log(new Vector(1, 2).minus(new Vector(2, 3)));  // → Vector{x: -1, y: -1}
console.log(new Vector(3, 4).length);                   // → 5
//#endregion


//#region Chapter 6.2 Группы 
// Напишите класс с именем Group (поскольку имя Set уже занято). Как и Set,
// он располагает методами add, delete и has. Его конструктор создает пустую
// группу, add добавляет в нее значение (но только если такого значения там
// еще нет), метод delete удаляет свой аргумент из группы (если таковой там
// был), а has возвращает логическое значение, указывающее, является ли его
// аргумент членом группы.
// Для того чтобы определить, одинаковы ли два значения, используйте оператор
// === или какой-либо его эквивалент, например indexof.
// Присвойте классу статический метод from, который принимает в качестве
// аргумента итерируемый объект и создает группу, содержащую все значения,
// полученные посредством перебора. 
console.log('=== Chapter 6.2 Группы');
class Group {
  constructor() {
    this.group = [];
  }
  add(value) {
    if (!this.has(value)) this.group.push(value);
  }
  delete(value) {
    let index = this.group.indexOf(value);
    if (this.has(value)) this.group.splice(index, 1);
  }
  has(value) {
    if (this.group.indexOf(value) !== -1) return true;
    else return false;
  }
  static from(arr) {
    let group = new Group();
    arr.map(value => group.add(value));
    return group;
  }
  [Symbol.iterator]() {
    return new GroupIterator(this);
  }
}

let group = Group.from([0, 5, 10, 15, 20, 25]);
console.log('group = ', group);     // group: (6) [0, 5, 10, 15, 20,  25]
console.log(group.has(10));         // → true
console.log(group.has(30));         // → false
group.add(10); 
group.add(10);
group.delete(10);
group.delete(10);
console.log(group.has(10));         // → false
console.log('group = ', group);     // group: (5) [0, 5, 15, 20, 25]
//#endregion

//#region Chapter 6.3 Итерируемые группы
// Сделайте класс Group из предыдущего упражнения итерируемым. Если вы
// не помните точный вид интерфейса итератора, перечитайте раздел, 
// посвященный этому интерфейсу, ранее в данной главе.
// Если для представления членов группы вы использовали массив, 
// не возвращайте просто итератор, созданный путем вызова метода 
// Symbol.iterator для массива. Это бы сработало, но оно не 
// соответствует цели данного упражнения. 
// Если ваш итератор ведет себя странно, когда группа изменяется во время
// итерации, - это нормально. 
console.log('=== Chapter 6.3 Итерируемые группы');
class GroupIterator {
  constructor(group) {
    this.group = group;
    this.index = 0;
  }
  next() {
    if (this.index >= this.group.group.length) return {done: true};
    else {
      let result = {value: this.group.group[this.index], done: false};
      this.index++;
      return result;
    }
  }
}

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
// → a
// → b
// → c
//#endregion

//#region Chapter 6.4 Заимствование метода
console.log('=== Chapter 6.4 Заимствование метода');
//#endregion
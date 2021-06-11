console.log('Chapter 7. Excercises');
// Chapter 7 excercises = CopyPaste book code... 
// I don't want to break my brain about it

//#region Chapter 7.1 Измерение параметров робота 
// Напишите функцию compareRobots, которая принимала бы на входе двух
// роботов (и их стартовую память). Функция должна генерировать 100 задач 
// и позволить каждому из роботов решить каждую из них. После этого
// должно быть вычислено среднее количество шагов, за которые каждый
// робот решает одну задачу. 
console.log('=== Chapter 7.1 Измерение параметров робота');
function countSteps(state, robot, memory) {
  for (let steps = 0;; steps++) {
    if (state.parcels.length == 0) return steps;
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
  }
}

function compareRobots(robot1, memory1, robot2, memory2) {
  let total1 = 0, total2 = 0;
  for (let i = 0; i < 100; i++) {
    let state = VillageState.random();
    total1 += countSteps(state, robot1, memory1);
    total2 += countSteps(state, robot2, memory2);
  }
  console.log(`Robot 1 needed ${total1 / 100} steps per task`)
  console.log(`Robot 2 needed ${total2 / 100}`)
}

compareRobots(routeRobot, [], goalOrientedRobot, []);
//#endregion

//#region Chapter 7.2 Эффективность робота
// Можете ли вы написать робота, который выполнял бы задачу доставки 
// быстрее, чем goalOrientedRobot? Понаблюдайте за поведением такого робота:
// какие глупости он делает? Как это можно исправить?
// Если вы выполнили предыдущее упражнение, то можете использовать
// функцию compareRobots, чтобы проверить, удалось ли вам улучшить робота. 
console.log('=== Chapter 7.2 Эффективность робота');
function lazyRobot({place, parcels}, route) {
  if (route.length == 0) {
    // Describe a route for every parcel
    let routes = parcels.map(parcel => {
      if (parcel.place != place) {
        return {route: findRoute(roadGraph, place, parcel.place),
                pickUp: true};
      } else {
        return {route: findRoute(roadGraph, place, parcel.address),
                pickUp: false};
      }
    });
    // This determines the precedence a route gets when choosing.
    // Route length counts negatively, routes that pick up a package
    // get a small bonus.
    function score({route, pickUp}) {
      return (pickUp ? 0.5 : 0) - route.length;
    }
    route = routes.reduce((a, b) => score(a) > score(b) ? a : b).route;
  }
  return {direction: route[0], memory: route.slice(1)};
}

runRobotAnimation(VillageState.random(), lazyRobot, []);
//#endregion

//#region Chapter 7.3 Постоянная группа
// Напишите новый класс PGroup, аналогичный классу Group из главы 6, 
// в котором хранится множество значений. Подобно Group, у него есть методы
// add, delete и has.
// Однако его метод add должен возвращать новый экземпляр PGroup с 
// добавленным заданным элементом, оставляя старый экземпляр без изменений.
// Аналогично delete создает новый экземпляр, в котором нет заданного
// элемента.
// Класс должен работать со значениями любого типа, а не только со строками. 
// Он не должен быть эффективным для большого количества значений.
// Конструктор не должен быть частью интерфейса класса (хотя вы определенно 
// захотите использовать его внутри класса). Вместо этого существует
// пустой экземпляр PGroup.empty, который можно применять в качестве 
// начального значения.
// Зачем нужно единственное значение PGroup.empty, если можно создать
// функцию, которая бы каждый раз генерировала новый пустой словарь? 
console.log('=== Chapter 7.3 Постоянная группа');
class PGroup {
  constructor(members) {
    this.members = members;
  }
  add(value) {
    if (this.has(value)) return this;
    return new PGroup(this.members.concat([value]));
  }
  delete(value) {
    if (!this.has(value)) return this;
    return new PGroup(this.members.filter(m => m !== value));
  }
  has(value) {
    return this.members.includes(value);
  }
}

PGroup.empty = new PGroup([]);

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false
//#endregion
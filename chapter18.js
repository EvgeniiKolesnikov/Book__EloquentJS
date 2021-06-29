console.log('Chapter 18. Excercises');

//#region Chapter 18.1 Согласование содержимого 
// Одна из вещей, которую позволяет делать НТТР, называется согласованием
// содержимого. Заголовок запроса Accept используется для указания серверу,
// какой тип документа клиент хочет получить. Многие серверы игнорируют
// этот заголовок, но, когда сервер допускает различные способы кодирования
// ресурса, он может просмотреть этот заголовок и отправить тот вариант,
// который предпочитает клиент.

// URL-aдpec https://eloquentjavascript.net/author
// настроен для ответа в формате открытого текста, HTML илиJSОN, 
// в зависимости от того, что запрашивает
// клиент. Эти форматы идентифицируются стандартными типами данных
// text/plain, text/html и application/json.

// Отправьте запросы на получение всех трех форматов данных с этого ресурса.
// Используйте свойство headers в объекте параметров, переданном для выборки, 
// чтобы установить заголовок с именем Accept для нужного типа носителя.
// Наконец, попробуйте запросить тип носителя application/rainbows+unicorns
// и посмотрите, какой код состояния получите. 
console.log('=== Chapter 18.1 Согласование содержимого');
const URL = "https://eloquentjavascript.net/author";
const types = ["text/plain", "text/html", "application/json", 
  "application/rainbows+unicorns"];

async function showTypes() {
  for (let type of types) {
    let response = await fetch(URL, {headers: {Accept: type}});
    let text = await response.text()
    console.log(`${type}: ${text}\n`);
    document.querySelector('#types').innerHTML += 
    `<p><b>${type}:</b> ${text}</p>`
  }
}
showTypes();
//#endregion


//#region Chapter 18.2 Среда выполнения JavaScript
// Создайте интерфейс, который позволял бы человеку вводить 
// и выполнять фрагменты кoдaJavaScript.
// Создайте поле <textarea> и кнопку рядом с ним, при нажатии
// которой использовался бы конструктор Function, описанный 
// в главе 10, чтобы обернуть текст в функцию и вызвать ее.
// Преобразуйте возвращаемое значение функции или возникшую 
// ошибку в строку и отображайте ее под текстовым полем. 
console.log('=== Chapter 18.2 Среда выполнения JavaScript');
const runBtn = document.querySelector("#button");
runBtn.addEventListener("click", () => {
  let jsCode = document.querySelector("#code").value;
  let outputNode = document.querySelector("#output");
  try {
    let result = Function(jsCode)();
    outputNode.innerHTML = String(result);
  } catch (e) {
    outputNode.innerHTML = "Error: " + e;
  }
});
//#endregion

//#region Chapter 18.3 Игра «Жизнь» Конвея
// Игра «Жизнм Конвея - это простая симуляция, создающая искусственную
// «жизнм на сетке, каждая клетка которой может быть живой или мертвой.
// Для каждого поколения (хода) выполняются следующие правила.

// • Любая живая клетка, у которой меньше двух или больше трех живых соседей, умирает.
// • Любая живая клетка, у которой два или три живых соседа, живет в следующем поколении.
// • Любая мертвая клетка, у которой ровно три живых соседа, становится живой клеткой.

// Соседней считается любая смежная ячейка, в том числе по диагонали.
// Обратите внимание, что данные правила применяются ко всей сетке сразу,
// а не по одному квадрату за раз. Это означает, что подсчет соседей основан
// на ситуации в начале поколения и изменения, происходящие с соседними
// ячейками во время жизни поколения, не должны влиять на новое состояние
// данной ячейки.

// Реализуйте эту игру, используя любую структуру данных, которую 
// считаете подходящей. Для того чтобы изначально заполнить сетку 
// случайными данными, примените Math.random. Отобразите игру в виде сетки
// полей флажков, рядом с которой находится кнопка, позволяющая перейти
// к следующему поколению. Когда пользователь устанавливает или снимает
// флажки, их изменения должны учитываться при вычислении следующего поколения. 
console.log('=== Chapter 18.3 Игра «Жизнь» Конвея');
// Default code 18.3
const width = 30, height = 15;
// I will represent the grid as an array of booleans.
let gridNode = document.querySelector("#grid");
// This holds the checkboxes that display the grid in the document.
let checkboxes = [];
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    let box = document.createElement("input");
    box.type = "checkbox";
    gridNode.appendChild(box);
    checkboxes.push(box);
  }
  gridNode.appendChild(document.createElement("br"));
}

function gridFromCheckboxes() {
  return checkboxes.map(box => box.checked);
}

function checkboxesFromGrid(grid) {
  grid.forEach((value, i) => checkboxes[i].checked = value);
}

function randomGrid() {
  let result = [];
  for (let i = 0; i < width * height; i++) {
    result.push(Math.random() < 0.3);
  }
  return result;
}

checkboxesFromGrid(randomGrid());

// This does a two-dimensional loop over the square around the given
// x,y position, counting all fields that have a cell but are not the
// center field.
function countNeighbors(grid, x, y) {
  let count = 0;
  for (let y1 = Math.max(0, y - 1); y1 <= Math.min(height - 1, y + 1); y1++) {
    for (let x1 = Math.max(0, x - 1); x1 <= Math.min(width - 1, x + 1); x1++) {
      if ((x1 != x || y1 != y) && grid[x1 + y1 * width]) {
        count++;
      }
    }
  }
  return count;
}

function nextGeneration(grid) {
  let newGrid = new Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let neighbors = countNeighbors(grid, x, y);
      let offset = x + y * width;
      if (neighbors < 2 || neighbors > 3) {
        newGrid[offset] = false;
      } else if (neighbors == 2) {
        newGrid[offset] = grid[offset];
      } else {
        newGrid[offset] = true;
      }
    }
  }
  return newGrid;
}

function turn() {
  checkboxesFromGrid(nextGeneration(gridFromCheckboxes()));
}

document.querySelector("#next").addEventListener("click", turn);

let running = null;
document.querySelector("#run").addEventListener("click", () => {
  if (running) {
    clearInterval(running);
    running = null;
  } else {
    running = setInterval(turn, 400);
  }
});
//#endregion
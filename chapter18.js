console.log('Chapter 18. Excercises');

//#region Chapter 18.0 Default Example
let list = document.querySelector("select");
let note = document.querySelector("textarea");
let state;

function setState(newState) {
  list.textContent = "";
  for (let name of Object.keys(newState.notes)) {
    let option = document.createElement("option");
    option.textContent = name;
    if (newState.selected == name) option.selected = true;
    list.appendChild(option);
  }
  note.value = newState.notes[newState.selected];

  localStorage.setItem("Notes", JSON.stringify(newState));
  state = newState;
}

setState(JSON.parse(localStorage.getItem("Notes")) || {
  notes: {
    "shopping list": "Carrots\nRaisins"
  },
  selected: "shopping list"
});

list.addEventListener("change", () => {
  setState({
    notes: state.notes,
    selected: list.value
  });
});

note.addEventListener("change", () => {
  setState({
    notes: Object.assign({}, state.notes, {
      [state.selected]: note.value
    }),
    selected: state.selected
  });
});

document.querySelector("button").addEventListener("click", () => {
  let name = prompt("Note name");
  if (name) setState({
    notes: Object.assign({}, state.notes, {
      [name]: ""
    }),
    selected: name
  });
});
//#endregion


//#region Chapter 18.1 Согласование содержимого 
// Одна из вещей, которую позволяет делать НТТР, называется согласованием
// содержимого. Заголовок запроса Accept используется для указания серверу,
// какой тип документа клиент хочет получить. Многие серверы игнорируют
// этот заголовок, но, когда сервер допускает различные способы кодирования
// ресурса, он может просмотреть этот заголовок и отправить тот вариант,
// который предпочитает клиент.

// URL-aдpec https://eloquent;javascript.net/author 
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

//#endregion
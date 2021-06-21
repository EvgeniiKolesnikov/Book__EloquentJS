console.log('Chapter 14. Excercises');

//#region Chapter 14.1 Построение таблицы (286 page)
// Таблица на HTML строится с помощью следующей структуры тегов:
// <table>
//  <tr>
//    <th>name</th>
//    <th>height</th>
//    <th>place</th>
//  </tr>
//  <tr>
//    <td>Kilimanjaro</td>
//    <td>S895</td>
//    <td>Tanzania</td>
//  </tr>
// </table>

// Внутри тега таблицы <tаЫе> для каждой строки существует тег <tr>. 
// Внутри тегов <tr> можно поместить элементы ячеек: либо ячейки 
// заголовка ( <th> ), // либо обычные ячейки ( <td> ). 

// Для заданного множества данных о горных вершинах - массива объектов
// со свойствами name, height и place - создайте структуру DOM для таблицы,
// в которой перечисляются эти объекты. В таблице должно быть по одному
// столбцу для каждого ключа и по одной строке для каждого объекта, 
// а вверху еще одна строка заголовка с элементами <th >, 
// в которой перечислены имена столбцов.

// Запишите это так, чтобы столбцы автоматически создавались из объектов,
// а первый столбец - из имен свойств.

// Поместите полученную таблицу внутри элемента с атрибутом id, значение
// которого равно "mountains ", чтобы таблица стала видимой в документе.

// Когда у вас это получится, выровняйте ячейки, содержащие числовые
// значения, по правому краю, задав для них свойство style. textAlign со
// значением "right". 
console.log('=== Chapter 14.1 Построение таблицы');
let mountains = document.createElement("div");
mountains.id ="mountains";
document.body.appendChild(mountains);

const MOUNTAINS = [
  {name: "Kilimanjaro", height: 5895, place: "Tanzania"},
  {name: "Everest", height: 8848, place: "Nepal"},
  {name: "Mount Fuji", height: 3776, place: "Japan"},
  {name: "Vaalserberg", height: 323, place: "Netherlands"},
  {name: "Denali", height: 6168, place: "United States"},
  {name: "Popocatepetl", height: 5465, place: "Mexico"},
  {name: "Mont Blanc", height: 4808, place: "Italy/France"}
];

function createTable(array) {
  let table = 
  `<table>
    <tr>${Object.keys(array[0]).map(thname => `<th>${thname}</th>`).join('')}</tr>
    ${array.map(tr => 
    `<tr>${Object.values(tr)
      .map(td => `<td ${typeof td === 'number' ? 'style="text-align: right"' : ''}>${td}</td>`)
      .join('')}
    </tr>`).join('')}
  </table>`
  return table
}

mountains.innerHTML = createTable(MOUNTAINS)
//#endregion

//#region Chapter 14.2 Элементы по имени тега
// Метод document.getElementsByTagName возвращает все дочерние элементы
// с заданным именем тега. Реализуйте собственную версию этого метода как
// функцию, которая принимает в качестве аргументов узел и строку (имя тега) 
// и возвращает массив, содержащий все узлы элемента-потомка с заданным именем тега.
// Чтобы найти имя тега элемента, используйте его свойство nodeName. 
// Но обратите внимание, что это свойство вернет имя тега в верхнем регистре. 
// Чтобы это исправить, задействуйте методы для работы со строками - toLowercase
// или toUpperCase.
console.log('=== Chapter 14.2 Элементы по имени тега');
function byTagName(node, tagName = tagName.toUpperCase()) {
  let elements = []
  function find(node) {
    for (let i = 0; i < node.childNodes.length; i++) {
      let child = node.childNodes[i];
      if (child.nodeType === document.ELEMENT_NODE) {
        if (child.nodeName === tagName.toUpperCase()) {
          elements.push(child);
        }
        find(child);
      }
    } 
  }
  find(node);
  console.log(elements);
  return elements;
}
console.log(byTagName(document.body, "h1").length);     // → 1
console.log(byTagName(document.body, "span").length);   // → 3
let para = document.querySelector("p");
console.log(byTagName(para, "span").length);            // → 2
//#endregion

//#region Chapter 14.3
console.log('=== Chapter 14.3');
//#endregion

//#region Chapter 14.4
console.log('=== Chapter 14.4');
//#endregion
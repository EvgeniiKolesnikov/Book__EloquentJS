console.log('Chapter 15. Excercises');

//#region Chapter 15.1 Воздушный шарик 
// Напишите страницу, которая отображает воздушный шарик (с помощью смайлика 🎈). 
// При нажатии стрелки вверх шарик должен надуваться (увеличиваться) на 10 %, 
// а при нажатии стрелки вниз - сдуваться (уменьшаться) на 10 %.

// Для того чтобы управлять размером текста (смайлики - это текст), вы
// можете использовать СSS-свойство font-size (style. fontSize) для его
// родительского элемента. Не забудьте указать в значении единицу измерения
// - например, пикселы (10рх).

// Имена клавиш со стрелками - "ArrowUp" и "ArrowOown". Убедитесь, что нажатия
// клавиш меняют только размер шарика и не приводят к прокрутке страницы. 

// Когда это сработает, добавьте еще одно свойство: если надуть шарик больше
// определенного размера, он лопнет. В данном случае взрыв означает замену
// шарика на смайлик 💥 с одновременным удалением обработчика события
// (так что вы не сможете больше надувать или сдувать лопнувший шарик). 
console.log('=== Chapter 15.1 Воздушный шарик');
const defaultSize = '16px'
const changeRatio = 0.1;
const maxSize = 150;

window.addEventListener("keydown", changeSize)
function changeSize(e) {
  e.preventDefault()
  const ball = document.querySelectorAll('p')
  const balls = Array.from(ball)
  let changePercent = 0
  if (e.key === 'ArrowUp') changePercent = 1 + changeRatio
  if (e.key === 'ArrowDown') changePercent = 1 - changeRatio
  for (const ball of balls) {
    let fontSize = ball.style.fontSize === '' ? defaultSize : ball.style.fontSize
    fontSize = Number(fontSize.substr(0, fontSize.length - 2))
    let newSize = (fontSize * changePercent).toFixed(2)
    // console.log(fontSize, newSize);
    if (newSize > maxSize) {
      ball.textContent = '💥'
      ball.style.fontSize = `${maxSize}px`
      window.removeEventListener("keydown", changeSize)
      return
    }
    ball.style.fontSize = `${newSize}px`
  }
}
//#endregion

//#region Chapter 15.2 След мыши
// В первое время существования JavaScript, когда вошли в моду яркие
// домашние страницы с множеством анимированных изображений, было придумано 
// несколько по-настоящему вдохновляющих способов использования
// языка. Одним из них был след мыши - серия элементов, которые тянулись
// за указателем при его перемещении по странице.

// В этом упражнении вы попробуете реализовать след мыши. Используйте
// элементы <div> с фиксированным размером, заданным цветом фона и абсолютным 
// позиционированием. Создайте группу таких элементов и при перемещении мыши 
// отображайте их в виде указателя мыши.

// Здесь возможны различные подходы. Можно сделать решение настолько
// простым или сложным, насколько вы захотите. Начните с простого решения 
// - сохраните фиксированное количество элементов, образующих след
// и, перебирая их в цикле, перемещайте каждый следующий элемент в текущее
// положение мыши всякий раз, когда происходит событие mousemove. 
console.log('=== Chapter 15.2 След мыши');
const countTrails = 77
let currentTrail = 0
let trails = []

window.addEventListener("mousemove", moved);
function moved(e) {
  // console.log(e)
  let trail = null
  if (trails.length < countTrails) {
    trail = document.createElement('div')
    trail.classList = 'trail'
    // trail.style.cursor = 'none'
    trail.style.left = (e.pageX - 3) + 'px'
    trail.style.top = (e.pageY - 3) + 'px'
    document.body.appendChild(trail)
    trails.push(trail)
  } else {
    trail = trails[currentTrail]
    trail.style.left = (e.pageX + 33) + 'px'
    trail.style.top = (e.pageY + 33) + 'px'
    currentTrail = (currentTrail + 1) % trails.length
  }
}
//#endregion

//#region Chapter 15.3 Вкладки
// Панели с вкладками очень распространены в пользовательских интерфейсах. 
// Они позволяют выбрать интерфейсную панель, перейдя на одну из
// нескольких вкладок, ~торчащих~ над элементом.

// В этом упражнении вам предлагается реализовать простой интерфейс с вкладками. 
// Напишите функцию asTabs, которая принимает узел DOM и создает
// интерфейс с вкладками, показывающий дочерние элементы этого узла. Она
// должна вставлять список элементов <buttoп> в верхней части узла, по одному
// для каждого дочернего элемента, содержащего текст, полученный из атрибута
// data-tabпame дочернего элемента. Все исходные дочерние элементы, кроме
// одного, должны быть скрыты (свойство display имеет значение попе). 

// Чтобы выбрать узел, который должен быть видимым, нужно нажать его кнопку.
// Когда это заработает, дополните интерфейс, чтобы кнопка выбранной
// вкладки имела другой стиль и чтобы было понятно, какая вкладка выбрана. 
console.log('=== Chapter 15.3 Вкладки');
function asTabs(node) {
  let tabs = Array.from(node.children).map(node => {
    let button = document.createElement("button");
    button.textContent = node.getAttribute("data-tabname");
    let tab = {button, node};
    button.addEventListener("click", () => selectTab(tab));
    return tab;
  });

  let tabList = document.createElement("div");
  for (let {button} of tabs) tabList.appendChild(button);
  node.insertBefore(tabList, node.firstChild);

  function selectTab(selectedTab) {
    for (let tab of tabs) {
      let selected = tab == selectedTab;
      tab.node.style.display = selected ? "" : "none";
      tab.button.style.color = selected ? "red" : "";
    }
  }
  selectTab(tabs[0]);
}

asTabs(document.querySelector("tab-panel"));
//#endregion
console.log('Chapter 17. Excercises');

let results = [
  {name: "Satisfied", count: 1043, color: "lightblue"},
  {name: "Neutral", count: 563, color: "lightgreen"},
  {name: "Unsatisfied", count: 510, color: "pink"},
  {name: "No comment", count: 175, color: "silver"}
];

//#region Chapter 17.1 Фигуры
// Напишите программу, рисующую на холсте следующие фигуры:
// О трапецию (четырехугольник, который с одной стороны шире, а с другой -уже);
// О красный ромб (прямоугольник, повернутый на 45 градусов или 1/4 7t радиан);
// О зигзагообразную линию;
// О спираль, состоящую из 100 прямых отрезков;
// О желтую звезду.

// Когда будете рисовать две последние фигуры, можете обратиться кописанию 
// Math.cos и Math.sin в главе 14, где показано, как с помощью этих функций
// можно получить координаты точки, расположенной на окружности
console.log('=== Chapter 17.1 Фигуры');
function createTrapezoid(x = 0, y = 0, a, b, h) {
  let cx1 = document.querySelector("#canvas1").getContext("2d");
  cx1.beginPath();
  cx1.moveTo(x + (b-a)/2, y);
  cx1.lineTo(x + (b-a)/2 + a, y);
  cx1.lineTo(x + b, y + h);
  cx1.lineTo(x , y + h);
  cx1.closePath();
  cx1.stroke();
}
createTrapezoid(10, 10, 50, 100, 50)

function createRhombus(x = 0, y = 0, l) {
  let cx1 = document.querySelector("#canvas1").getContext("2d");
  cx1.beginPath();
  cx1.translate(x + l, y + l);
  cx1.rotate(Math.PI / 4);
  cx1.fillStyle = "red";
  cx1.fillRect(-l, -l, l*2, l*2);
  cx1.resetTransform();
}
createRhombus(150, 10, 20)

function createZigzag(x, y, l, h) {
  let cx1 = document.querySelector("#canvas1").getContext("2d");
  cx1.beginPath();
  cx1.moveTo(x, y);
  for (let i = 0; i < 6; i++) {
    cx1.lineTo(x + l, y + i * h + h/2);
    cx1.lineTo(x, y + i * h + h);
  }
  cx1.stroke();
}
createZigzag(230, 10, 70, 8);
//#endregion

//#region Chapter 17.2 Круговая диаграмма
// Ранее в этой главе мы видели пример программы, создающей круговую
// диаграмму. Измените данную программу так, чтобы имя каждой категории
// отображалось рядом с сегментом, который ее представляет. 
// Попробуйте подобрать приятный на вид способ автоматического позиционирования 
// этого текста, который бы работал для других наборов данных. 
console.log('=== Chapter 17.2 Круговая диаграмма');
let cx2 = document.querySelector("#canvas2").getContext("2d");
let total = results.reduce((sum, {count}) => sum + count, 0);
let currentAngle = -0.5 * Math.PI;
let centerX = 300, centerY = 150;

// Add code to draw the slice labels in this loop.
for (let result of results) {
  let sliceAngle = (result.count / total) * 2 * Math.PI;
  cx2.beginPath();
  cx2.arc(centerX, centerY, 100, currentAngle, currentAngle + sliceAngle);
  currentAngle += sliceAngle;
  cx2.lineTo(centerX, centerY);
  cx2.fillStyle = result.color;
  cx2.fill();
}
//#endregion

//#region Chapter 17.3 Прыгающий шарик
// Используя метод requestAnimationFrame, описанный в главах 14 и 16, 
// нарисуйте прямоугольник с прыгающим шариком внутри. Шарик движется
// с постоянной скоростью и отскакивает от стенок прямоугольника, когда
// касается их. 
console.log('=== Chapter 17.3 Прыгающий шарик');
let cx3 = document.querySelector("#canvas3").getContext("2d");
let lastTime = null;

function frame(time) {
  if (lastTime != null) {
    updateAnimation(Math.min(100, time - lastTime) / 1000);
  }
  lastTime = time;
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

function updateAnimation(step) {
  // Your code here.
}
//#endregion
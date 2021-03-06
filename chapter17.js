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

function createSpiral(x, y, r) {
  let xCenter = x + r;
  let yCenter = y + r;
  let cx1 = document.querySelector("#canvas1").getContext("2d");
  cx1.beginPath();
  cx1.moveTo(xCenter, yCenter);
  for (let i = 0; i < 300; i++) {
    let angle = i * Math.PI / 30;
    let dist = r * i / 200;
    cx1.lineTo(xCenter + Math.sin(angle) * dist,
              yCenter + Math.cos(angle) * dist);
  }
  cx1.stroke();
}
createSpiral(350, 10, 20);

function createStar(x, y, r) {
  let cx1 = document.querySelector("#canvas1").getContext("2d");
  let xCenter = x + r
  let yCenter = y + r;
  cx1.beginPath();
  cx1.moveTo(xCenter + r, yCenter);
  for (let i = 1; i <= 8; i++) {
    let angle = i * Math.PI / 4;
    cx1.quadraticCurveTo(xCenter, yCenter,
                        xCenter + Math.cos(angle) * r,
                        yCenter + Math.sin(angle) * r);
  }
  cx1.fillStyle = "gold";
  cx1.fill();
}
createStar(430, -10, 40);
//#endregion

//#region Chapter 17.2 Круговая диаграмма
// Ранее в этой главе мы видели пример программы, создающей круговую
// диаграмму. Измените данную программу так, чтобы имя каждой категории
// отображалось рядом с сегментом, который ее представляет. 
// Попробуйте подобрать приятный на вид способ автоматического позиционирования 
// этого текста, который бы работал для других наборов данных. 
console.log('=== Chapter 17.2 Круговая диаграмма');
function createRoundDiagram(x, y, r = 100) {
  let cx = document.querySelector("#canvas2").getContext("2d");
  let total = results.reduce((sum, {count}) => sum + count, 0);
  let currentAngle = -0.5 * Math.PI;
  let centerX = x, centerY = y;
  for (let result of results) {
    let sliceAngle = (result.count / total) * 2 * Math.PI;
    cx.beginPath();
    cx.arc(centerX, centerY, r, currentAngle, currentAngle + sliceAngle);
    cx.lineTo(centerX, centerY);
    cx.fillStyle = result.color;
    cx.fill();
    // text
    cx.fillStyle = result.color;
    cx.font = "18px Arial";
    const middleAngle = currentAngle + 0.5 * sliceAngle;
    cx.textAlign = Math.cos(middleAngle) > 0 ? "left" : "right";
    cx.fillText(`"${result.name}"`, 
      centerX + r * 1.2 * Math.cos(middleAngle), 
      centerY + r * 1.2 * Math.sin(middleAngle));
    // nextAngle
    currentAngle += sliceAngle;
  }
}
createRoundDiagram(300, 150, 100);
//#endregion

//#region Chapter 17.3 Прыгающий шарик
// Используя метод requestAnimationFrame, описанный в главах 14 и 16, 
// нарисуйте прямоугольник с прыгающим шариком внутри. Шарик движется
// с постоянной скоростью и отскакивает от стенок прямоугольника, когда
// касается их. 
console.log('=== Chapter 17.3 Прыгающий шарик');
let cx = document.querySelector("#canvas3").getContext("2d");
let lastTime = null;

function frame(time) {
  if (lastTime != null) {
    updateAnimation(Math.min(100, time - lastTime) / 1000);
  }
  lastTime = time;
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

let x = 100, y = 300;
let radius = 10;
let speedX = 100, speedY = 60;

function updateAnimation(step) {
  // Default code below 
  cx.clearRect(0, 0, 400, 400);
  cx.strokeStyle = "blue";
  cx.lineWidth = 4;
  cx.strokeRect(25, 25, 350, 350);
  
  x += step * speedX;
  y += step * speedY;
  if (x < 25 + radius || x > 375 - radius) speedX = -speedX;
  if (y < 25 + radius || y > 375 - radius) speedY = -speedY;
  cx.fillStyle = "red";
  cx.beginPath();
  cx.arc(x, y, radius, 0, 7);
  cx.fill();
}
//#endregion
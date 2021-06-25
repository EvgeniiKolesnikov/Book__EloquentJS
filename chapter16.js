console.log('Chapter 16. Excercises');
// Chapter 16 excercises = CopyPaste book code... 

//#region Chapter 16.1 Игра окончена 
// В платформенных играх игрок по традиции начинает игру с ограниченным
// количеством жизней и теряет одну из них при каждой смерти. Когда жизни
// заканчиваются, игра начинается с самого начала.
// Добавьте в runGame наличие у игрока нескольких жизней. Пускай игрок
// начинает с трех. Выводите текущее количество жизней (используя console.log) 
// каждый раз, когда начинается новый уровень.
console.log('=== Chapter 16.1 Игра окончена');
async function runGame(plans, Display) {
  let lives = 3;
  for (let level = 0; level < plans.length && lives > 0;) {
    console.log(`Level ${level + 1}, lives: ${lives}`);
    let status = await runLevel(new Level(plans[level]),
                                Display);
    if (status == "won") level++;
    else lives--;
  }
  if (lives > 0) {
    console.log("You've won!");
  } else {
    console.log("Game over");
  }
}
//#endregion

//#region Chapter 16.2 Приостановка игры 
// Сделайте возможным приостановить (поставить на паузу) или отменить
// игру, нажав клавишу Esc
// Для этого можно изменить функцию runLevel, использовав 
// другой обработчик событий клавиатуры и прерывая либо возобновляя 
// анимацию при каждом нажатии клавиши Esc

// На первый взгляд может показаться, что интерфейс runAnimation для этого
// не предназначен, но вы решите проблему, изменив способ, которым runLevel
// вызывает данный интерфейс. 
console.log('=== Chapter 16.2 Приостановка игры');
function runLevel(level, Display) {
  let display = new Display(document.body, level);
  let state = State.start(level);
  let ending = 1;
  let running = "yes";

  return new Promise(resolve => {
    function escHandler(event) {
      if (event.key != "Escape") return;
      event.preventDefault();
      if (running == "no") {
        running = "yes";
        runAnimation(frame);
      } else if (running == "yes") {
        running = "pausing";
      } else {
        running = "yes";
      }
    }
    window.addEventListener("keydown", escHandler);
    let arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);

    function frame(time) {
      if (running == "pausing") {
        running = "no";
        return false;
      }

      state = state.update(time, arrowKeys);
      display.syncState(state);
      if (state.status == "playing") {
        return true;
      } else if (ending > 0) {
        ending -= time;
        return true;
      } else {
        display.clear();
        window.removeEventListener("keydown", escHandler);
        arrowKeys.unregister();
        resolve(state.status);
        return false;
      }
    }
    runAnimation(frame);
  });
}

function trackKeys(keys) {
  let down = Object.create(null);
  function track(event) {
    if (keys.includes(event.key)) {
      down[event.key] = event.type == "keydown";
      event.preventDefault();
    }
  }
  window.addEventListener("keydown", track);
  window.addEventListener("keyup", track);
  down.unregister = () => {
    window.removeEventListener("keydown", track);
    window.removeEventListener("keyup", track);
  };
  return down;
}
// runGame(GAME_LEVELS, DOMDisplay);
//#endregion

//#region Chapter 16.3 Монстр
console.log('=== Chapter 16.3 Монстр');

//#endregion
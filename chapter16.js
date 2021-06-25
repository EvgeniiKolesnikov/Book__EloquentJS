console.log('Chapter 16. Excercises');
// Chapter 16 excercises = CopyPaste book code... 

//#region Chapter 16.1 Игра окончена 
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
console.log('=== Chapter 16.2 Приостановка игры');

//#endregion

//#region Chapter 16.3 Монстр
console.log('=== Chapter 16.3 Монстр');

//#endregion
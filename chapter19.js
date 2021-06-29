console.log('Chapter 19. Excercises');

//#region Chapter 19.1 
console.log('=== Chapter 19.1');
// // The original PixelEditor class. Extend the constructor.
// class PixelEditor {
//   constructor(state, config) {
//     let {
//       tools,
//       controls,
//       dispatch
//     } = config;
//     this.state = state;
//     this.canvas = new PictureCanvas(state.picture, pos => {
//       let tool = tools[this.state.tool];
//       let onMove = tool(pos, this.state, dispatch);
//       if (onMove) {
//         return pos => onMove(pos, this.state, dispatch);
//       }
//     });
//     this.controls = controls.map(
//       Control => new Control(state, config));
//     this.dom = elt("div", {}, this.canvas.dom, elt("br"),
//       ...this.controls.reduce(
//         (a, c) => a.concat(" ", c.dom), []));
//   }
//   syncState(state) {
//     this.state = state;
//     this.canvas.syncState(state.picture);
//     for (let ctrl of this.controls) ctrl.syncState(state);
//   }
// }
// document.querySelector("div").appendChild(startPixelEditor({}));
//#endregion


//#region Chapter 19.2 
console.log('=== Chapter 19.2');
// // Change this method
// PictureCanvas.prototype.syncState = function (picture) {
//   if (this.picture == picture) return;
//   this.picture = picture;
//   drawPicture(this.picture, this.dom, scale);
// };
// // You may want to use or change this as well
// function drawPicture(picture, canvas, scale) {
//   canvas.width = picture.width * scale;
//   canvas.height = picture.height * scale;
//   let cx = canvas.getContext("2d");
//   for (let y = 0; y < picture.height; y++) {
//     for (let x = 0; x < picture.width; x++) {
//       cx.fillStyle = picture.pixel(x, y);
//       cx.fillRect(x * scale, y * scale, scale, scale);
//     }
//   }
// }
// document.querySelector("div").appendChild(startPixelEditor({}));
//#endregion


//#region Chapter 19.3 
console.log('=== Chapter 19.3');
// function circle(pos, state, dispatch) {
//   // Your code here
// }
// let dom = startPixelEditor({
//   tools: Object.assign({}, baseTools, {circle})
// });
// document.querySelector("div").appendChild(dom);
//#endregion


//#region Chapter 19.4 
console.log('=== Chapter 19.4');
// // The old draw tool. Rewrite this.
// function draw(pos, state, dispatch) {
//   function drawPixel({x, y}, state) {
//     let drawn = {x, y, color: state.color};
//     dispatch({picture: state.picture.draw([drawn])});
//   }
//   drawPixel(pos, state);
//   return drawPixel;
// }
// function line(pos, state, dispatch) {
//   // Your code here
// }
// let dom = startPixelEditor({
//   tools: {draw, line, fill, rectangle, pick}
// });
// document.querySelector("div").appendChild(dom);
//#endregion
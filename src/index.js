import { Game } from './app/statuses/game.js';
import { MainMenu } from './app/statuses/main-menu.js';
import { GameOver } from './app/statuses/game-over.js';

const GAMEOVER = 'GameOver';
const GAMEON = 'GameOn';
const MAINMENU = 'MainMenu';

const GAME_WIDTH = 412;
const GAME_HEIGHT = 780;

window.addEventListener('load', main);

function main() {

  const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;

  const canvas = createAndConfigureCanvas();
  const ctx = canvas.getContext('2d');
  //ctx.imageSmoothingEnabled = false; //-- When active, images scaled and drawn on canvas appear pixelated

  let lastTime = 1;
  let key = MAINMENU;

  const statusesMachine = new Map();
  statusesMachine.set(MAINMENU, new MainMenu(canvas));
  statusesMachine.set(GAMEON, new Game(canvas));
  statusesMachine.set(GAMEOVER, new GameOver(canvas));

  function animate(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    key = statusesMachine.get(key).update(deltaTime);
    statusesMachine.get(key).draw();
    canvas.clickedX = -1;
    canvas.clickedY = -1;
    requestAnimationFrame(animate);
  }

  animate(0);

}

function createAndConfigureCanvas() {
    
  const mycanvas = document.getElementById('canvas1');
  mycanvas.width = GAME_WIDTH;
  mycanvas.height = GAME_HEIGHT;
  mycanvas.clickedX = -1;
  mycanvas.clickedY = -1;
  // Add a 'click' event listener to canvas.
  // When the player clicks inside the canvas you get x and y coords relative to the canvas context
  mycanvas.addEventListener('click', $event => {
    // This is the bounding rectangle of the canvas
    const rect = mycanvas.getBoundingClientRect();
    // As click event takes the x and y coord relative to the screen, we need to know where is the canvas
    // relative to the screen.
    mycanvas.clickedX = Math.floor(($event.x - rect.left) * GAME_WIDTH / mycanvas.clientWidth);
    //                         ^__ Amount of pixels the canvas is xTranslated from the left side of the screen
    //              ^_ xCoord where you have clicked relative to the left side of the screen
    mycanvas.clickedY = Math.floor(($event.y - rect.top) * GAME_HEIGHT / mycanvas.clientHeight);
    //                         ^__ Amount of pixels the canvas is yTranslated from the top side of the screen
    //              ^_ yCoord where you have clicked relative to the top side of the screen
  });
  
  /*
  * This piece of code is commented during develop process, it toggles fullscreen mode
  * and avoid to auto-rotate the screen when the game is played in an smartphone and
  * fullscreen mode is on
  *
  */

  // boton.addEventListener('click', () => {
  //     let doc = document;
  //     if (document.fullscreenEnabled) {
  //         if (!doc.fullscreenElement) {
  //             let body = document.querySelector(`body`);
  //             let fullscreen = mycanvas.requestFullscreen 
  //                         ||   mycanvas.mozRequestFullScreen 
  //                         ||   mycanvas.webkitRequestFullscreen 
  //                         ||    mycanvas.msRequestFullscreen;
              
  //             fullscreen.call(body).then( () => {
  //                 mycanvas.style.width = '100%';
  //                 mycanvas.style.height = '90%';
  //                 window.screen.orientation.lock(`portrait-primary`)
  //                     .catch( error => error);
  //                 })
  //                 .catch( error => error );
  //         } else {
  //             mycanvas.style.width = '412px';
  //             mycanvas.style.height = '780px';
  //             document.exitFullscreen();
  //             mycanvas.scrollIntoView({block: "start"});
  //         }
  //     }
  // });

  return mycanvas;
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
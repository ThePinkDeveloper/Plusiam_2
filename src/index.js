import { Game } from './app/statuses/game.js';
import { MainMenu } from './app/statuses/main-menu.js';
import { GameOver } from './app/statuses/game-over.js';

const GAMEOVER = 'GameOver';
const GAMEON = 'GameOn';
const MAINMENU = 'MainMenu';

window.addEventListener('load', main);

function main() {

  const canvas = createAndConfigureCanvas();
  const ctx = canvas.getContext('2d');
  //ctx.imageSmoothingEnabled = false; //-- When active, images scaled and drawn on canvas appear pixelated


  let lastTime = 1;
  let key = MAINMENU;

  const statusesMachine = new Map();
  statusesMachine.set(MAINMENU, new MainMenu(ctx));
  statusesMachine.set(GAMEON, new Game(ctx));
  statusesMachine.set(GAMEOVER, new GameOver(ctx));

  function animate(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    key = statusesMachine.get(key).update(deltaTime);
    statusesMachine.get(key).draw();
    requestAnimationFrame(animate);
  }

  animate(0);

}

function createAndConfigureCanvas() {
    
  const mycanvas = document.getElementById('canvas1');

  mycanvas.width = 412;
  mycanvas.height = 780;
  
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
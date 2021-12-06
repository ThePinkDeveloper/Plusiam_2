import { Game } from "./app/game.js";

window.addEventListener('load', runGame);

function runGame() {
  
  const canvas = createAndConfigureCanvas();

  const ctx = canvas.getContext('2d');
  //ctx.imageSmoothingEnabled = false; //-- When active, images scaled and drawn on canvas appear pixelated
  let lastTime = 1;
  const game = new Game(ctx);
  
  function createAndConfigureCanvas() {
    let mycanvas = document.getElementById('canvas1');

    mycanvas.width = 412;
    mycanvas.height = 780;
    
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

    function animate(timeStamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        game.update(deltaTime);
        game.draw();
        requestAnimationFrame(animate);
    }

    function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
      }


    animate(0);
}
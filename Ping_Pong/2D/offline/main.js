import { Game }   from './game.js';
import { keys, gameContants }   from './consts.js';

var board   = document.getElementById('board');
var ball    = document.getElementById('ball');
var p1      = document.getElementById('playerLeft');
var p2      = document.getElementById('playerRigth');
var counter = document.getElementById('counter');
var wh1     = document.getElementById('wh1');
var wh2     = document.getElementById('wh2');

document.addEventListener('resize' ,() =>{
    
})
console.log(gameContants);
var pingPong = new Game(board, ball, counter ,p1, p2,wh1, wh2, keys, gameContants);
pingPong.startRound(1);

// let a = new Promise((resolve, reject) => {
//         setTimeout (() => {
//             pingPong.endRound();
//             resolve("end");
//         }, 300000);
//     })
// a.then((res) => {
//     console.log(res);
// })

// pingPong.play();
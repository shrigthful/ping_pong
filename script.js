import { Ball } from '/Ping_Pong/2D/offline/ball.js';
//             
var b = new Ball(1, 150 , 100, -10, 3, 6, 7, 20, 680, 0, 700, 350);


console.log(b.getPosition());
console.log(b.getDirection());

console.log(b.nextReboundPointX());
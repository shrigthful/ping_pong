import { Game }   from 'game.js';
import { keys, gameContants }   from 'consts.js';

var board   = document.getElementById('board');
var ball    = document.getElementById('ball');
var p1      = document.getElementById('playerLeft');
var p2      = document.getElementById('playerRigth');

var pingPong = new Game(board, ball, p1, p2, keys, gameContants);
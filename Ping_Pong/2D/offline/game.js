import { Player } from 'Player.js';

class game
{
    constructor(Board,Ball, p1, p2 , Keys , gameContants)
    {
        this.keys   = Keys;
        this.Board  = Board;
        this.ball   = Ball

        this.p1 = new Player(
                    p1,
                    gameContants.p1StartingPositionX,
                    gameContants.p1StartingPositionY,
                    Ball.clientHeight,
                    Board.clientHeight,
                );
        this.p2 = new Player(
                    p2,
                    gameContants.p2.p1StartingPositionX,
                    gameContants.p2.p1StartingPositionY,
                    Ball.clientHeight,
                    Board.clientHeight
                );
        
        this.MovmentInterval = NULL;
    };

    playerMove()
    {
        if (keys.w === true)
            this.p1.moveUp();
        else if (keys.s === true)
            this.p1.moveDown();

        if (keys.p === true)
            this.p2.moveUp();
        else if(keys.l === true)
            this.p2.moveDown();
    };
    
    startRound()
    {
        document.addEventListener('keydown', keys.keyDownListner);
        document.addEventListener('keyup', keys.keyUpListner);    
        this.MovmentInterval = setInterval(this.playerMove, 60);
    };
    endRound()
    {
        document.removeEventListener('keydown');
        document.removeEventListener('keyup');
        clearInterval(this.MovmentInterval);
    };
}

var Board   = document.getElementById('board');
var ball    = document.getElementById('ball');
var p1      = document.getElementById('playerLeft');
var p2      = document.getElementById('playerRigth');

var gameContants = {
    'p1StartingPositionX' :  p1.style.marginLeft,
    'p1StartingPositionY' :  (board.clientHeight / 2) - (p1.clientHeight / 2),

    'p2StartingPositionX' :  Board.clientWidth 
                                - p2.style.marginRight 
                                - Ball.clientWidth,
    'p2StartingPositionY' :  (board.clientHeight / 2) - (p1.clientHeight / 2),

    'ballStartingPositionX' : (board.clientWidth / 2) - (ball.clientWidth / 2),
    'ballStartingPositionY' : (board.clientHeight / 2) - (ball.clientHeight / 2),

    'PlayerSpeed'         : 7,
    'PlayerImpactOnMove'  : 3,
    'PlayerImpactOnStop'  : 0,

    'BallmaxSpeedX' : 13,
    'BallmaxSpeedY' : 6
};
var keys    = {
    'w' : false,
    's' : false,

    'p' : false,
    'l' : false,

    'keyUpListner' : function(event){
        if (event.key === 'w' || event.key === 'W')
            keys.w = false;
        if (event.key === 's' || event.key === 'S')
            keys.s = false;
    
        if (event.key === 'p' || event.key === 'P')
            keys.p = false;
        if (event.key === 'L' || event.key === 'l')
            keys.l = false;
    },

    'keyDownListner' : function(event){
        if (event.key === 'w' || event.key === 'W')
            keys.w = true;
        if (event.key === 's' || event.key === 'S')
            keys.s = true;

        if (event.key === 'p' || event.key === 'P')
            keys.p = true;
        if (event.key === 'L' || event.key === 'l')
            keys.l = true;
    }
}
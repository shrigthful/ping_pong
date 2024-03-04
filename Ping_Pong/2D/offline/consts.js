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
    'BallmaxSpeedY' : 6,
    'BallStartVx'   : 10,
    'ballStartVy'   : 0,

    'BorderXL'      : 0,
    'BorderXR'      : board.clientWidth,
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
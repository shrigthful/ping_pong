var Board   = document.getElementById('board');
var ball    = document.getElementById('ball');
var p1      = document.getElementById('playerLeft');
var p2      = document.getElementById('playerRigth');

export var gameContants = {
    'p1StartingPositionX' :  parseInt(getComputedStyle(p1).getPropertyValue('margin-left')),
    'p1StartingPositionY' :  parseInt((board.clientHeight / 2) - (p1.clientHeight / 2)),

    'p2StartingPositionX' : parseInt(Board.clientWidth  
                            - parseInt(getComputedStyle(p2).getPropertyValue('margin-right')) 
                            - ball.clientWidth),
    'p2StartingPositionY' :  parseInt((board.clientHeight / 2) - (p1.clientHeight / 2)),

    'PlayeSpeed'    : 10,

    'ballStartingPositionX' : parseInt((board.clientWidth / 2) - (ball.clientWidth / 2)),
    'ballStartingPositionY' : parseInt((board.clientHeight / 2) - (ball.clientHeight / 2)),

    'PlayerSpeed'         : 7,
    'PlayerImpactOnMove'  : 3,
    'PlayerImpactOnStop'  : 0,

    'BallmaxSpeedX' : 7,
    'BallmaxSpeedY' : 6,
    'BallStartVx'   : 5,
    'ballStartVy'   : 0,

    'BorderXL'      : 0,
    'BorderXR'      : parseInt(board.clientWidth),

    'BallMoveDelay'   : 30,
    'PlayerMoveDelay' : 20
};
export var keys    = {
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
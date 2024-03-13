var Board   = document.getElementById('board');
var ball    = document.getElementById('ball');
var p1      = document.getElementById('playerLeft');
var p2      = document.getElementById('playerRigth');

export var gameContants = {
    'defX'                  : 700,
    'defY'                  : 500,
    //player conf
    'p1StartingPositionX'   :  parseInt(getComputedStyle(p1).getPropertyValue('margin-left')),
    'p1StartingPositionY'   :  parseInt((board.clientHeight / 2) - (p1.clientHeight / 2)),
    'p2StartingPositionX'   : parseInt(Board.clientWidth  
                                - parseInt(getComputedStyle(p2).getPropertyValue('margin-right')) 
                                - ball.clientWidth),
    'p2StartingPositionY'   :  parseInt((board.clientHeight / 2) - (p1.clientHeight / 2)),
    'playeSpeed'            : 10,
    'playerMoveDelay'       : 20,
    'pMinPos'               : 0,
    'pMaxPos'               : parseInt(board.clientHeight - p1.clientHeight),
    'pSize'                 : p1.clientHeight,
    'playerSpeed'           : 7,
    'playerImpactOnMove'    : 3,
    'playerImpactOnStop'    : 0,

    //ballCOnf
    'ballStartingPositionX' : parseInt((board.clientWidth / 2) - (ball.clientWidth / 2)),
    'ballStartingPositionY' : parseInt((board.clientHeight / 2) - (ball.clientHeight / 2)),
    'bMaxVx'                : 13,
    'bMaxVy'                : 6,
    'ballStartVx'           : -10,
    'ballStartVy'           : 0,
    'ballSize'              : parseInt(ball.clientHeight),
    'ballSpeed'             : parseInt(Math.sqrt(Math.pow(13, 2), Math.pow(6, 2))),
    'ballMoveDelay'         : 30,
    'bMinX'                 : 0,
    'bMaxX'                 : parseInt(board.clientWidth - ball.clientHeight),
    'bMinY'                 : 0,
    'bMaxY'                 : parseInt(board.clientHeight - ball.clientHeight),

    //board
    'Wall1'                 : 0,
    'wall2'                 : parseInt(board.clientWidth),
    'BoardW'                : parseInt(board.clientWidth),
    'floor'                 : parseInt(board.clientHeight),
    'BoardH'                : parseInt(board.clientHeight),
    'roof'                  : 0
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

function PercentToPx()
{
    
}
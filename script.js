const lineColor = "white";
var header1 = document.getElementById("wh1");
var header2 = document.getElementById("wh2");
var board = document.getElementById('board');

var winH = window.innerHeight;
var winW = window.innerWidth;

//player
var playerView1 = document.getElementById('playerLeft');
var playerView2 = document.getElementById('playerRigth');
var pad_size = parseInt(playerView1.clientHeight);
var pad_start_point = board.clientHeight / 2 - pad_size / 2;
playerView1.style.marginTop = pad_start_point.toString() + "px";
playerView2.style.marginTop = pad_start_point.toString() + "px";

var ymax = parseInt(board.clientHeight) - parseInt(pad_size);

var ymin = 0;
//ball


var ball_ele = document.getElementById('ball');

const startTop = parseInt(board.clientHeight) / 2 - ball_ele.clientHeight / 2;
ball_ele.style.top = startTop.toString() + 'px';

const startLeft = parseInt(board.clientWidth) / 2 - ball_ele.clientWidth / 2;
ball_ele.style.left = startLeft.toString() + 'px';

var ball = {
    'dom'   : ball_ele,
    'x'     : startLeft,
    'y'     : startTop,
    'vx'    : 0,
    'vy'    : 0,
};

let css_obj1 = getComputedStyle(playerView1);
var p1x = parseInt(css_obj1.getPropertyValue('margin-left'));
var p1 = {
    'dom'   : playerView1,
    'x'     : p1x,
    'y'     : 0
};
p1.y = parseInt( p1.dom.style.marginTop);

let css_obj2 = getComputedStyle(playerView2);
var p2x = parseInt(css_obj2.getPropertyValue('margin-right'));
var p2 = {
    'dom'   : playerView2,
    'x'     : board.clientWidth - p2x - 10,
    'y'     : parseInt( p2.dom.style.marginTop)
};
p2.y = parseInt( p2.dom.style.marginTop);

//unit
var keys =
{
    'w' : false,
    's' : false,

    'p' : false,
    'l' : false
};
ball.vx = -5;
ball.vy = 0;

function isInRange(number, min, max) {
    return number >= min && number <= max;
}

function get_impacte_on_x(vx, newx){
    if (Math.abs(p1.x - newx) < Math.abs(vx))
        newx = p1.x;
    else if (Math.abs(p2.x - newx) < Math.abs(vx))
        newx = p2.x;
    else if (Math.abs(board.clientWidth - newx) < Math.abs(vx))
        newx = board.clientWidth;
    else if (Math.abs(0 - newx) < Math.abs(vx))
        newx = 0;
    return newx;
}

function redirect_player(){
    if (ball.x == p1.x && isInRange(ball.y, p1.y + 10, p1.y + pad_size)){
        ball.vx *= -1; return true;
    }
    
    else if (ball.x ==p2.x && isInRange(ball.y, p2.y + 1, p2.y + pad_size)){
        ball.vx *= -1; return true;
    }

}

function redirect_x(){
    if (ball.x == 0){
        ball.vx *= -1; return true;
    }

    else if (ball.x == parseInt(board.clientWidth)) {
        ball.vx *= -1; return true;
    }   
    return false;
}

function redirect_y(){
    if (ball.y == 0){
        ball.vy *= -1; return true;
    }

    else if (ball.y == parseInt(board.clientWidth)) {
        ball.vy *= -1; return true;
    }   
    return false;
}

var bounce = setInterval(function(){
    var isimpact = false;
    if (redirect_player() == true)
    {
        isimpact = true;
        ball.x += ball.vx;
    }
    else
    {
        if (redirect_y() == true)
        {
            isimpact = true;
            ball.y += ball.vy;
        }
        if (redirect_x() == true)
        {
            isimpact = true;
            ball.x += ball.vx;
        }
    }


    if (isimpact == false)
    {
        ball.x += ball.vx;
        ball.x = get_impacte_on_x(ball.vx, ball.x);
    }
    ball.dom.style.left = ball.x.toString() + 'px';
   

}, 20);

var myInterval = setInterval(function() {
    //windew size
    winH = window.innerHeight;
    winW = window.innerWidth;

    //bord size
    var bx = board.clientWidth;
    var by = board.clientHeight;

    // print values for debug
    header1.textContent = "w = " + winW + "; h = " + winH;
    header2.textContent = "wb = " + bx + "; hb = " + by;

    //key exec
    if (keys.w === true)
    {
        p1.y = parseInt( p1.dom.style.marginTop) - 5;
        if (p1.y < ymin)
            p1.y = 0;
        p1.dom.style.marginTop = p1.y.toString() + 'px';
    }
    else if (keys.s === true)
    {
        p1.y = parseInt(p1.dom.style.marginTop) + 5;
        if (p1.y > ymax)
            p1.y = ymax;
        p1.dom.style.marginTop = p1.y.toString() + 'px';
    }

    if (keys.p === true)
    {
        p2.y = parseInt(p2.dom.style.marginTop) - 5;
        if (p2.y < ymin)
            p2.y = 0;
            p2.dom.style.marginTop = p2.y.toString() + 'px';
    }
    else if(keys.l === true)
    {
        p2.y = parseInt(p2.dom.style.marginTop) + 5;
        if (p2.y > ymax)
            p2.y = ymax;
        p2.dom.style.marginTop = p2.y.toString() + 'px';
    }

}, 30);


document.addEventListener('keydown', function(event){
    if (event.key === 'w' || event.key === 'W')
        keys.w = true;
    if (event.key === 's' || event.key === 'S')
        keys.s = true;

    if (event.key === 'p' || event.key === 'P')
        keys.p = true;
    if (event.key === 'L' || event.key === 'l')
        keys.l = true;
});


document.addEventListener('keyup', function(event){
    if (event.key === 'w' || event.key === 'W')
        keys.w = false;
    if (event.key === 's' || event.key === 'S')
        keys.s = false;

    if (event.key === 'p' || event.key === 'P')
        keys.p = false;
    if (event.key === 'L' || event.key === 'l')
        keys.l = false;
});
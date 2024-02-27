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

function adjustAngele(ang , add)
{
    ang += add
    if (ang < 0)
        ang += 2 * Math.PI;
    else if (ang > 2 * Math.PI)
        ang -= 2 * Math.PI;
};
var ball = {
    'dom'   : ball_ele,
    'x'     : startLeft,
    'y'     : startTop,
    'vx'    : 0,
    'vy'    : 0,
    'angle' : (Math.PI/5)
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
    'y'     : 0
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
ball.vx = Math.cos(ball.angle) * 5;
ball.vy = Math.sin(ball.angle) * 5;

function isInRange(number, min, max) {
    return number >= min && number <= max;
}

function get_impacte_on_x(vx, newx){
    if (Math.abs(p1.x - newx) < Math.abs(vx))
        newx = p1.x;
    else if (Math.abs(p2.x - newx) < Math.abs(vx))
        newx = p2.x
    else if (Math.abs((board.clientWidth - 10) - newx) < Math.abs(vx))
        newx = board.clientWidth - 10;
    else if (Math.abs(0 - newx) < Math.abs(vx))
        newx = 0;
    return newx;
}

function get_impacte_on_y(vy, newy){
    if (Math.abs((board.clientHeight - 10) - newy) < Math.abs(vy))
        newy = board.clientHeight - 10;
    else if (Math.abs(0 - newy) < Math.abs(vy))
        newy = 0;
    return newy;
}
// pre16.954915028125264
//21
//px: 21  newx:21.786404500040113 vx: -4.045084971874737 p1.x :21
//px: 21  newx:16.954915028125264 vx: -4.045084971874737 p1.x :21
function redirect_player(){
    if (ball.x == p1.x && isInRange(ball.y, p1.y + 10, p1.y + pad_size)){
        ball.vx *= -1; 
        if(keys.w == true)
        {
            if (ball.vy < 0)
                ball.angle += Math.PI / 3;
            else
                ball.angle -= Math.PI / 3;
        }
        else if(keys.s == true)
        {
            if (ball.vy > 0)
                ball.angle += Math.PI / 3;
            else
                ball.angle -= Math.PI / 3;
        }

        ball.vx = Math.cos(ball.angle) * 5;
        ball.vy = Math.sin(ball.angle) * 5;
        console.log(ball.vx);
        console.log(ball.vy);
        return true;
    }
    
    else if (ball.x ==p2.x && isInRange(ball.y, p2.y + 1, p2.y + pad_size)){
        ball.vx *= -1; 
        if(keys.p == true)
        {
            if (ball.vy < 0)
                ball.angle += Math.PI / 3;
            else
                ball.angle -= Math.PI / 3;
        }
        else if(keys.l == true)
        {
            if (ball.vy > 0)
                ball.angle += Math.PI / 3;
            else
                ball.angle -= Math.PI / 3;
        }

        ball.vx -= Math.cos(ball.angle) * 5;
        ball.vy = Math.sin(ball.angle) * 5;

        return true;
    }
}

function redirect_x(){

    if (ball.x == p1.x || ball.x == p2.x)
        return true;

    if (ball.x == 0){
        ball.vx *= -1; return true;
    }

    else if (ball.x == (parseInt(board.clientWidth) - 10)) {
        ball.vx *= -1; return true;
    }   
    return false;
}

function redirect_y(){
    if (ball.y == 0){
        ball.vy *= -1; return true;
    }

    else if (ball.y == (parseInt(board.clientHeight) - 10)) {
        ball.vy *= -1; return true;
    }   
    return false;
}

//ball rander
var bounce = setInterval(function(){
    var isimpact = false;
    // if (redirect_player() == true)
    // {
    //     isimpact = true;
    //     ball.x += ball.vx;
    //     ball.y += ball.vy;
    // }
    // else
    // {
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
    // }
//check if x and y == hit spot
//yes reverse the angle  and put it on the next position
//no{
//vx++
//vy++
//posibliti adjust to for hitspot}
   

    if (isimpact == false)
    {
        ball.x += ball.vx;
        ball.x = get_impacte_on_x(ball.vx, ball.x);
        ball.y += ball.vy;
        ball.y = get_impacte_on_y(ball.vy, ball.y);
    }
    // console.log(ball.vx);
    // console.log(ball.vy);
    // console.log(ball.x);
    // console.log(ball.y);
    ball.dom.style.left = ball.x.toString() + 'px';
    ball.dom.style.top = ball.y.toString() + 'px';

}, 20);

//keybord
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

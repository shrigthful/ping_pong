export class Ball
{
    constructor(htmlEle, x, y, vx, vy, vxMax, vyMax, P1x, P2x, WallLx, WallRx, boardH)
    {
        this.dom = htmlEle;
        
        this.startX = x;
        this.startY = y;

        this.x  = this.startX;
        this.y  = this.startY;
        this.vx = vx;
        this.vy = vy;

        this.vxMax = vxMax;
        this.vyMax = vyMax;
        this.speed = parseInt(Math.sqrt(Math.pow(vxMax, 2), Math.pow(vyMax, 2)));

        this.p1x    = P1x;
        this.p2x    = P2x;
        this.wall1  = WallLx;
        this.wall2  = WallRx;
        this.boardH = boardH;
    };

    reset(dir)
    {
        this.x = this.startX;
        this.y = this.startY;

        this.vy = 0;
        this.vx = dir * 10;
    };

    nextReboundPointX() {
        let maxXvalBeforeYlimit = ( () => {
            let ydist = (this.vy > 0) ? this.boardH - this.y : this.y;
            console.log(parseInt(this.vx *  Math.abs(ydist / this.vy)));
            return (this.vx *  Math.abs(ydist / this.vy));
        }) ();

        var allPosibleImpactPoints = [maxXvalBeforeYlimit, this.wall1, this.p1x ,this.p2x, this.wall2];
            
        var ft_filter = (maxXvalBeforeYlimit >= 0) ?
                        (ele, val) => ele >= val :
                        (ele, val) => ele <= val;

        var ft_select = (maxXvalBeforeYlimit >= 0) ?
                        (arr) => Math.min(...arr) :
                        (arr) => Math.max(...arr);
                        
        return (() => ft_select(allPosibleImpactPoints.filter(ele => ft_filter(ele, this.x)))) ();
    }

    getPosition() {
        return {'x' : this.x, 'y' : this.y};
    };

    getDirection() {
        return {'vx' : this.vx , 'vy' : this.vy};
    }

    setDirection(newDir) {
        this.vx = newDir.vx;
        this.vy = newDir.vy
        
        var sx = (ball.vx < 0) ? -1 : 1;
        var sy = (ball.vy < 0) ? -1 : 1;

        this.vx = sx * ((Math.abs(this.vx) > this.vxMax) ? this.vxMax : this.vx);     
        this.vy = sy * ((Math.abs(this.vy) > this.vyMax) ? this.vyMax : this.vy);
    }

    move(limitX){
        this.x += this.vx;
        this.y += this.vy;
        //prevent ball from crosing x
        this.x = (this.x > this.wall2) ? this.wall2 : this.x;
        this.x = (this.x < this.wall1) ? this.wall1 : this.x;
        //prevent ball from crosing y
        this.y = (this.y > this.boardH) ? this.boardH : this.y;
        this.y = (this.y < 0) ? 0 : this.y;

        if (this.vx > 0 && this.x >limitX)
            this.x = limitX;
        if (this.vx < 0 && this.x < limitX)
            this.x = limitX;
    }

};
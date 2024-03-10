export class Ball
{
    constructor(htmlEle, c)
    {
        this.dom    = htmlEle;
        this.x      = c.ballStartingPositionX;
        this.y      = c.ballStartingPositionY;
        this.vx     = c.ballStartVx;
        this.vy     = c.ballStartVy;
        this.c      = c;
    };

    reset(dir)
    {
        this.x = this.c.ballStartingPositionX;
        this.y = this.c.ballStartingPositionY;

        this.vy = this.c.ballStartVy;
        this.vx = dir * this.c.ballStartVx;
    };

    nextReboundPointX() {
        var allPosibleImpactPoints = [
            this.c.bMinX,
            this.c.p1StartingPositionX,
            this.c.p2StartingPositionX,
            this.c.bMaxX
        ];
        var ft_filter = (this.vx >= 0) ?
                        (ele, val) => ele > val :
                        (ele, val) => ele < val;

        var ft_select = (this.vx >= 0) ?
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

    ballOnRoof(){
        return this.y == 0 || this.y == this.c.floor;
    }

    setDirection(newDir) {
        this.vx = newDir.vx;
        this.vy = newDir.vy;

        var sx = (this.vx < 0) ? -1 : 1;
        var sy = (this.vy < 0) ? -1 : 1;

        this.vx = (Math.abs(this.vx) > this.c.bMaxVx) ? (sx * this.c.bMaxVx) : this.vx;     
        this.vy = (Math.abs(this.vy) > this.c.bMaxVy) ? (sy * this.c.bMaxVy) : this.vy;
    }

    display()
    {
        this.dom.style.left = this.x.toString() + 'px';
        this.dom.style.top  = this.y.toString() + 'px';
    }

    move(limitX)
    {
        this.x += this.vx;
        this.y += this.vy;
        //prevent ball from crosing x
        this.x = (this.x > this.c.bMaxX) ? this.c.bMaxX : this.x;
        this.x = (this.x < this.c.bMinX) ? this.c.bMinX : this.x;
        //prevent ball from crosing y
        this.y = (this.y > this.c.bMaxY) ? this.c.bMaxY : this.y;
        this.y = (this.y < this.c.bMinY) ? this.c.bMinY : this.y;
        //get the proper value for ball display
        // limitX = (this.vx > 0) ? (limitX - this.c.ballSize) : limitX;

        if (this.vx > 0 && this.x >limitX)
            this.x = limitX;
        if (this.vx < 0 && this.x < limitX)
            this.x = limitX;
        this.display();
    }
};
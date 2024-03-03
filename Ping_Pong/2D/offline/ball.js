class Ball
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

    nextReboundPoint() {
        let maxXvalBeforeYlimit = () => {
            let ydist = (vy > 0) ? this.boardH - this.y : this.y;
            return this.vx *  Math.abs(ydist / this.vy);
        };
        
        const points = new Set([])
    }

    getPosition() {
        return {'x' : this.x, 'y' : this.y};
    };

    getDirection() {
        return {'vx' : this.vx , 'vy' : this.vy};
    }

};
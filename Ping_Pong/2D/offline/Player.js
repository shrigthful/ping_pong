class Player
{
    constructor(htmlEle, x, y , ballHigth, BoardHeigth , maxVy)
    {
        this.dom    = htmlEle;
        this.goals  = 0;
        this.x      = x;
        this.y      = y;
        this.startP = {'x' : x, 'y' : y};
        this.hitBox = {
            'min'   : y - ballHigth,
            'max'  : htmlEle.clientHeight
        };

        this.lowestPosition     = 0;
        this.higthestPosition   = BoardHeigth - htmlEle.clientHeight; 
        this.parts = new Map()
        this.parts.set(0,  maxvy / 3);
        this.parts.set(20, maxvy / 2);
        this.parts.set(40, maxvy / 1);
        this.parts.set(50, maxvy / 1);
        this.parts.set(60, maxvy / 2);
        this.parts.set(80, maxvy / 3);
    };

    moveUp(dist){
        this.y -= dist;
        if (this.y < this.lowestPosition)
            this.y = this.lowestPosition;
    };

    moveDown(dist){
        this.y += dist;
        if (this.y > this.higthestPosition)
            this.y = this.higthestPosition;
    }
    
    display() {
        this.dom.style.marginTop = this.y + 'px';
    }

    hitsBall(x, y) {
        if (this.x != x)
            return false;
        return y >= this.hitBox.min && y <= this.hitBox.max;
    }

    reset() {
        this.x      = this.startP.x;
        this.y      = this.startP.y;
    }

    markGoal() {
        this.goals++;
    }

    getPlayerAffectOnBall(ball)
    {
        let relativeY = this.hitBox.min - ball.y;
        let hitPoint = parseInt(relativeY / (this.hitBox.max - this.hitBox.min));
        let range = (()=> {
                for(key of this.parts.keys()) {
                    if (key >= hitPoint)
                        return this.parts.get(key);
                }
        })();

        let newVy = ball.vy / range; 
        let newVx = ball.vx * -1;
        return {'vx' : newVx, 'vy' : newVy};
    }
};
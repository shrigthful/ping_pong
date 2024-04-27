export class Player
{
    constructor(htmlEle, x, y, c)
    {
        this.dom    = htmlEle;
        this.x      = x;
        this.y      = y;
        this.c      = c;
        this.hitBox = {
            'min'   : 0,
            'max'   : c.pSize
        };
        this.startPx      = this.x;
        this.startPy      = this.y;
        this.goals  = 0;
        this.parts  = new Map()
        this.parts.set(0,  c.bMaxVy / 1);
        this.parts.set(20, c.bMaxVy / 2);
        this.parts.set(40, c.bMaxVy / 4);
        this.parts.set(50, c.bMaxVy / 4);
        this.parts.set(60, c.bMaxVy / 2);
        this.parts.set(80, c.bMaxVy / 1);
    };

    moveUp(dist){
        this.y -= dist;
        if (this.y < this.c.pMinPos)
            this.y = this.c.pMinPos;
    };

    moveDown(dist){
        this.y += dist;
        if (this.y > this.c.pMaxPos)
            this.y = this.c.pMaxPos;
    }
    
    display() {
        this.dom.style.marginTop = this.y + 'px';
    }

    ToDisplay(){
        return this.y
    }

    hitsBall(x, y) {
        if (this.x != x)
            return false;
        y -= this.y;
        return y >= this.hitBox.min && y <= this.hitBox.max + this.c.ballSize;
    }
    reset() {
        this.x      = this.startPx;
        this.y      = this.startPy;
    }

    getPlayerAffectOnBall(ball)
    {
        let relativeY = ball.y - this.y;
        let hitPoint = parseFloat(relativeY / this.hitBox.max);
        let range = (()=> {
                for(let key of this.parts.keys()) {
                    if (key >= hitPoint)
                        return this.parts.get(key);
                }
        })();
        range = parseInt(range);

        let newVy = Math.abs(ball.vy + range);
       
        let newVx =  ball.vx * -1;
        if (ball.vy == 0)
            newVy = 2;
        if (hitPoint < 0.5){
            newVy *= -1;}
        return {'vx' : newVx, 'vy' : newVy};
    }
};
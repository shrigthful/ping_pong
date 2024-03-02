class Player
{
    constructor(htmlEle, x, y , ballHigth, BoardHeigth)
    {
        this.dom    = htmlEle;
        this.goals  = 0;
        this.x      = x;
        this.y      = y;
        this.hitBox = {
            'min'   : y - ballHigth,
            'max'  : htmlEle.clientHeight
        };

        this.lowestPosition     = 0;
        this.higthestPosition   = BoardHeigth - htmlEle.clientHeight; 
    };

    changeDisplay(){
        this.dom.style = this.y.toString() + 'px';
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
    
    hitsBall(x, y)
    {
        if (this.x != x)
            return false;
        return y >= this.hitBox.min && y <= this.hitBox.max;
    }

    setPosition(x, y)
    {
        this.x      = x;
        this.y      = y;
    }
};
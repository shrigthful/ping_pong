import { Player } from './player.js';
import { Ball }   from './ball.js';

export class Game
{
    constructor(Board, ball, counter, p1, p2, wh1, wh2, Keys , consts)
    {

        this.Board      = Board;
        this.ball       = new Ball(ball, consts);
        this.counter    = counter;
        this.wh1        = wh1;
        this.wh2        = wh2;
        this.p1         = new Player (
                                p1,
                                consts.p1StartingPositionX,
                                consts.p1StartingPositionY,
                                consts
                            );
        this.p2         = new Player (
                                p2,
                                consts.p2StartingPositionX,
                                consts.p2StartingPositionY,
                                consts
                            );
        this.keys       = Keys;
        this.c          = consts;

        this.MovmentInterval    = undefined;
        this.balldest           = undefined;
        this.ballRebound        = false;
    };

    playerMove()
    {
        if (this.keys.w === true)
            this.p1.moveUp(this.c.playeSpeed)
        else if (this.keys.s === true)
            this.p1.moveDown(this.c.playeSpeed);

        if (this.keys.p === true)
            this.p2.moveUp(this.c.playeSpeed);
        else if(this.keys.l === true)
            this.p2.moveDown(this.c.playeSpeed);

        this.p1.display();
        this.p2.display();
    };

    reset(signe)
    {
        this.p1.reset();
        this.p1.display();
        this.p2.reset();
        this.p2.display();
        this.ball.reset(signe);
        this.ball.display();
    }

    async startRound(signe)
    {
        this.reset(signe);
        document.addEventListener('keydown', this.keys.keyDownListner);
        document.addEventListener('keyup', this.keys.keyUpListner);    
        this.MovmentInterval = setInterval(this.playerMove.bind(this), this.c.playerMoveDelay);
        this.Board.style.filter = "blur(5px)";

        for(let i = 3; i >= 0; i--)  {
            await new Promise(resolve => {
                setTimeout (() => {
                    this.counter.textContent = i;
                    if (i == 0)
                        this.counter.textContent = "";
                    resolve();
                },1000);
            });
        }
        
        this.Board.style.filter = "";
        this.play();
    };

    endRound()
    {
        clearInterval(this.MovmentInterval);
        document.removeEventListener('keydown', this.keys.keyDownListner);
        document.removeEventListener('keyup', this.keys.keyUpListner);
        this.reset(1);
        this.wh1.textContent = this.p1.goals;
        this.wh2.textContent = this.p2.goals;
    };

    moveBall()
    {
        this.ball.move(this.balldest);
        this.ball.display();
        if (this.ball.x == this.balldest || this.ball.ballOnRoof())
        {
            this.ballRebound = true;
            this.balldest = undefined;
            this.ballLoop = 0;
        }
    }

    ReboundBall()
    {
        if (this.p1.hitsBall(this.ball.x, this.ball.y + this.c.ballSize)){
            this.ball.setDirection(this.p1.getPlayerAffectOnBall(this.ball));
            this.ball.vy *= -1;
        }
        else if (this.p2.hitsBall(this.ball.x, this.ball.y + this.c.ballSize)){
            this.ball.setDirection(this.p2.getPlayerAffectOnBall(this.ball));
            this.ball.vy *= -1;
        }
        else if (this.ball.x == this.c.bMinX)   {return 2; }
        else if (this.ball.x == this.c.bMaxX)   {return 1; }
        else    {this.ball.vy *= -1;}
        return 0;
    }

    iteration()
    {
        if (this.ballRebound == false)
        {
            if (this.balldest == undefined)
                this.balldest = this.ball.nextReboundPointX();
            this.moveBall();
        } 
        if (this.ballRebound == true)
        {
            this.ballRebound = false;
            return this.ReboundBall();
        }
        return 0;
    }

    makeWiner(p){
        p.goals += 1;
        this.endRound();
        if   (p.goals == 5)
            return 1;
        return 0;
    }

    play(){

        //this.iteration();
        let loop = setInterval(() => 
        {
            switch (this.iteration()) {
                case 1 :
                    clearInterval(loop);
                    this.makeWiner(this.p1);
                    if (this.p1.goals == 5)
                        return 1;
                    this.startRound(1); 
                    break;
    
                case 2 :
                    clearInterval(loop);
                    this.makeWiner(this.p2);
                    if (this.p2.goals == 5)
                        return 2;
                    this.startRound(-1);
                    break;
                
                default : break;
            }
        }, 30);
    }
}
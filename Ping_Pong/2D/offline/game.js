import { Player } from './player.js';
import { Ball }   from './ball.js';

export class Game
{
    constructor(Board, ball, counter, p1, p2 , Keys , gameContants)
    {
        this.keys   = Keys;
        this.Board  = Board;
        this.wall1  = gameContants.BorderXL;
        this.wall2  = gameContants.BorderXR;
        this.ball   = new Ball(
                        ball, 
                        gameContants.ballStartingPositionX,
                        gameContants.ballStartingPositionY,
                        gameContants.ballStartVx,
                        gameContants.ballStartVy,
                        gameContants.BallmaxSpeedX,
                        gameContants.BallmaxSpeedY,
                        gameContants.p1StartingPositionX,
                        gameContants.p2StartingPositionX,
                        gameContants.BorderXL,
                        parseInt(gameContants.BorderXR - ball.clientWidth),
                        parseInt(board.clientHeight - ball.clientHeight) 
                    );

        this.p1 = new Player(
                    p1,
                    gameContants.p1StartingPositionX,
                    gameContants.p1StartingPositionY,
                    Ball.clientHeight,
                    Board.clientHeight,
                    gameContants.BallmaxSpeedY
                );
        this.p2 = new Player(
                    p2,
                    gameContants.p2StartingPositionX,
                    gameContants.p2StartingPositionY,
                    Ball.clientHeight,
                    Board.clientHeight,
                    gameContants.BallmaxSpeedY
                );
        this.PlayerSpeed = gameContants.PlayerSpeed;
        this.MovmentInterval = undefined;
        this.moveDelay       = gameContants.PlayerMoveDelay
        this.ballDelay       = gameContants.BallMoveDelay;
        this.balldest        = undefined;
        this.counter = counter;
        this.ballRebound = false;
    };

    playerMove()
    {
        if (this.keys.w === true)
            this.p1.moveUp(this.PlayerSpeed)
        else if (this.keys.s === true)
            this.p1.moveDown(this.PlayerSpeed);

        if (this.keys.p === true)
            this.p2.moveUp(this.PlayerSpeed);
        else if(this.keys.l === true)
            this.p2.moveDown(this.PlayerSpeed);

        this.p1.display();
        this.p2.display();
    };

    async startRound(signe)
    {
        this.p1.reset();
        this.p1.display();
        this.p2.reset();
        this.p2.display();
        this.ball.reset(signe);
        this.ball.display();
        document.addEventListener('keydown', this.keys.keyDownListner);
        document.addEventListener('keyup', this.keys.keyUpListner);    
        this.MovmentInterval = setInterval(this.playerMove.bind(this), this.moveDelay);
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
       
        this.p1.reset();
        this.p1.display();
        this.p2.reset();
        this.p2.display();
        this.ball.reset(1);
        this.ball.display();
    };

    moveBall()
    {
        this.ball.move(this.balldest);
        this.ball.display();
        if (this.ball.x == this.balldest || this.ballballOnRoof())
        {
            this.ballRebound = true;
            this.balldest = undefined;
            this.ballLoop = 0;
        }
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
            if (this.p1.hitsBall(this.ball.x, this.ball.y)){
                let newDir = this.p1.getPlayerAffectOnBall(this.ball);
                this.ball.setDirection(newDir);
                this.ball.vy *= -1;
            }
            else if (this.p2.hitsBall(this.ball.x, this.ball.y)){
                var newDir = this.p2.getPlayerAffectOnBall(this.ball);
                this.ball.setDirection(newDir);
                this.ball.vy *= -1;
            }
            else if (this.ball.x == this.wall1)   {return 1; }
            else if (this.ball.x == this.ball.wall2)   {return 2; }
            else    {this.ball.vy *= -1;}
            this.ballRebound = false;
        }
        return 0;
    }

    makeWiner(p){
        this.endRound();
        p.markGoal();
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
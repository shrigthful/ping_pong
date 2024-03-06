import { Player } from 'player.js';
import { Ball }   from 'ball.js';

class Game
{
    constructor(Board, ball, p1, p2 , Keys , gameContants)
    {
        this.keys   = Keys;
        this.Board  = Board;
        this.Board  = gameContants.wall;
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
                        gameContants.BorderXR,
                        board.clientHeight
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
                    gameContants.p2.p1StartingPositionX,
                    gameContants.p2.p1StartingPositionY,
                    Ball.clientHeight,
                    Board.clientHeight,
                    gameContants.BallmaxSpeedY
                );
        
        this.MovmentInterval = NULL;
    };

    playerMove()
    {
        if (keys.w === true)
            this.p1.moveUp();
        else if (keys.s === true)
            this.p1.moveDown();

        if (keys.p === true)
            this.p2.moveUp();
        else if(keys.l === true)
            this.p2.moveDown();

        this.p1.display();
        this.p2.display();
    };

    startRound()
    {
        this.p1.reset();
        this.p2.reset();
        document.addEventListener('keydown', keys.keyDownListner);
        document.addEventListener('keyup', keys.keyUpListner);    
        this.MovmentInterval = setInterval(this.playerMove, 60);


    };

    endRound()
    {
        document.removeEventListener('keydown');
        document.removeEventListener('keyup');
        clearInterval(this.MovmentInterval);
    };

    moveBall(x)
    {
        const interval = setInterval(() => {
                this.ball.move(x);
                this.ball.display();
                if (this.ball.x == x)
                    clearInterval(interval);
        }, 60);
    }

    iteration()
    {
        var x = this.ball.nextReboundPointX();
        this.ball.moveBall();
        
        if (this.p1.hitsBall(this.x, this.y)){
            let newDir = this.p1.getPlayerAffectOnBall(this.ball);
            this.ball.setDirection(newDir);
        }
        else if (this.p1.hitsBall(this.x, this.y)){
            let newDir = this.p2.getPlayerAffectOnBall(this.ball);
            this.ball.setDirection(newDir);
        }
        else if (x == this.wall1)   {return 1; }
        else if (x == this.wall2)   {return 2; }
        else    this.ball.vy *= -1;
        
        return 0;
    }

    makeWiner(p, signe){
        p.markGoal();
        if   (p.goals == 5)
            return 1;
        this.startRound();
        this.ball.reset({'x' : signe * 10, 'y' : 0});
        return 0;
    }

    play(){
        this.startRound();
        while (true) {
            switch (this.iteration()) {
                case 1 :
                    this.endRound();
                    if (this.makeWiner(p1, -1) != 0)
                        return 1;
                    this.startRound();
                    break;
    
                case 2 :
                    this.endRound();
                    if (this.makeWiner(p2, 1) != 0)
                        return 2;
                    this.startRound();
                    break;
                
                default : break;
            }
        }
    }
}
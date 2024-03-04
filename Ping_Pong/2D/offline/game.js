import { Player } from 'player.js';
import { Ball }   from 'ball.js';

class Game
{
    constructor(Board, ball, p1, p2 , Keys , gameContants)
    {
        this.keys   = Keys;
        this.Board  = Board;
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
                    Board.clientHeight
                );
        this.p2 = new Player(
                    p2,
                    gameContants.p2.p1StartingPositionX,
                    gameContants.p2.p1StartingPositionY,
                    Ball.clientHeight,
                    Board.clientHeight
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
}
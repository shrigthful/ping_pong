export class DiplayManager{
    constructor(consts){
        this.windowH = consts.defX;
        this.windowW = consts.defY;
        this.consts = consts;
    }

    displayBall(ballx, bally, dom){
        var x = parseFloat(ballx) / parseFloat(this.consts.defX);
        x *= this.windowH;
        var y = parseFloat(bally) / parseFloat(this.consts.defY);
        y *= this.windowW

        dom.style.left = x.toString() + 'px';
        dom.style.top  = y.toString() + 'px';
    }

    displayPlayer(py, dom){
        var y = parseFloat(py) / parseFloat(this.consts.defX);
        y *= this.windowW;
        dom.style.marginTop = y.toString() + 'px';
    }

    update(){
        var doc = document.getElementById("board");
        this.windowH = doc.clientHeight;
        this.document = doc.clientWidth;
    }
}

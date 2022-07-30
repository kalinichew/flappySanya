    document.addEventListener("DOMContentLoaded",()=>{
    let card = document.getElementById("card");
    let button = document.getElementById("button_start");

    let gameOver = document.getElementById("gameOver");

    let cvs = document.getElementById("canvas");
    let ctx = cvs.getContext("2d");

    let bird = new Image();
    let bg = new Image();
    let fg = new Image();
    let pipeUp = new Image();
    let pipeBottom = new Image();
    
    bird.src = "content/image/flappy_bird_bird.png";
    bg.src = "content/image/flappy_bird_bg.png";
    fg.src = "content/image/flappy_bird_fg.png";
    pipeUp.src = "content/image/flappy_bird_pipeUp.png";
    pipeBottom.src = "content/image/flappy_bird_pipeBottom.png";
    
    let fly = new Audio();
    let score_audio = new Audio();
    
    fly.src = "content/fly.mp3";
    score_audio.src = "content/score.mp3";
    
    let gap = 160;

    let pipe = [];

    pipe[0] = {
        x : cvs.width,
        y : 0
    }

    let score = 0;

    let xPos = 10;
    let yPos = 150;
    let grav = 1.8;

    
    function moveUp(){
        yPos -= 41;
        fly.play();
    }
    function draw() {
        document.addEventListener("click",moveUp);
        ctx.drawImage(bg,0,0);

        for (let i=0; i<pipe.length; i++) {
            ctx.drawImage(pipeUp,pipe[i].x,pipe[i].y);
            ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

            pipe[i].x --;

            if(pipe[i].x == 125){
                pipe.push({
                    x : cvs.width,
                    y : Math.floor(Math.random()*pipeUp.height) - pipeUp.height
                });
            }

            if (xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width
                && (yPos <= pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
                    window.location.reload();
                }

            if (pipe[i].x == 5) {
                score++;
                score_audio.play();
            }
        }
            ctx.drawImage(fg,0, cvs.height - fg.height);
            ctx.drawImage(bird,xPos,yPos);

            yPos += grav;

            ctx.fillStyle = "#000";
            ctx.font = "24px Veranda";
            ctx.fillText("Счет: " + score, 10, cvs.height - 20);

        requestAnimationFrame(draw);
        card.hidden="true";
    }
    // pipeBottom.onload = draw;
    button.addEventListener("click",draw);
    
    });
    

var context, controller, player, loop, obstacle;

context = document.querySelector("canvas").getContext("2d");//pobranie canvasa

context.canvas.height = 600;
context.canvas.width = 700;

//obiekt którym sterujemy
player = {

    height: 100,
    jumping: true,
    width: 100,
    x: 350 - (100/2),
    y: 0,
    y_velocity: 0

};

//sterowanie
controller = {

    up: false,
    keyListener: function (event) {

        var key_state = (event.type == "mousedown") ? true : false

                controller.up = key_state;
    

    }

};
//przeszkoda
obstacle = {
    height: 50,
    width: 50,
    x: 700,
    y: 500,
    speed: 5,
    move: function(){
        obstacle.x -= this.speed;
            if (obstacle.x == 0){
                obstacle.x = 700;
            }
    },
}

//pętla gry
loop = function () {

    if (controller.up && player.jumping == false) {

        player.y_velocity -= 40;
        player.jumping = true;

    }

    
    player.y_velocity += 2;// grawitacja
    player.y += player.y_velocity;
    

    // pozycja na ziemi
    if (player.y > 600 - 50 - 100) {

        player.jumping = false;
        player.y = 450;
        player.y_velocity = 0;

    }

    context.fillStyle = "white";
    context.fillRect(0, 0, 700, 600);
    context.fillStyle = "black";
    context.beginPath();
    context.rect(player.x, player.y, player.width, player.height);
    context.fill();
    context.strokeStyle = 'black';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(0, 550);
    context.lineTo(700, 550);
    context.stroke();
    context.beginPath();
    context.rect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    context.fill();
    context.strokeStyle = 'red';
    setInterval(obstacle.move(), 1000);

    if(((player.x < obstacle.x && player.x + 100 > obstacle.x) || (obstacle.x + 50 > player.x && obstacle.x + 50 < player.x + player.width)) && (player.y + 50 >= obstacle.y)){
        alert('Game Over');
        window.location.reload(true);
        window.requestAnimationFrame();
    };
    window.requestAnimationFrame(loop);

};

window.addEventListener("mousedown", controller.keyListener);
window.addEventListener("mouseup", controller.keyListener);
window.requestAnimationFrame(loop);
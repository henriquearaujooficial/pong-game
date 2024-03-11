let ctx, p1_y, p2_y, p1_points, p2_points;
let ball_x, ball_y, ball_speed_x, ball_speed_y;
let p1_key, p2_key;
const canvasWidth = 800, canvasHeight = 500;
const paddleWidth = 20, paddleHeight = 120;
const paddleSpeed = 10;
const ballSize = 10;

function setup(){
    const canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    // Inicializa as posições e os pontos dos jogadores
    p1_y = p2_y = (canvasHeight / 2) - (paddleHeight / 2);
    p1_points = p2_points = 0;

    // Inicializa a posição e a velocidade da bola
    initBall();

    // Define um loop de atualização a uma taxa de 60 fps
    setInterval(loop, 1000 / 60);
}

function loop(){
    // Atualiza a posição da bola
    ball_x += ball_speed_x;
    ball_y += ball_speed_y;

    // Verifica colisões com as bordas verticais
    if (ball_y <= 0 || ball_y + ballSize >= canvasHeight) {
        ball_speed_y *= -1;
    }

    // Verifica colisões com as barras dos jogadores
    if (ball_x <= 0 && ball_y + ballSize >= p1_y && ball_y <= p1_y + paddleHeight) {
        ball_speed_x *= -1;
    }
    if (ball_x + ballSize >= canvasWidth && ball_y + ballSize >= p2_y && ball_y <= p2_y + paddleHeight) {
        ball_speed_x *= -1;
    }

    // Verifica se a bola saiu pela lateral esquerda ou direita
    if (ball_x <= 0) {
        p2_points++;
        initBall();
    }
    if (ball_x + ballSize >= canvasWidth) {
        p1_points++;
        initBall();
    }

    // Movimenta as barras dos jogadores de acordo com as teclas pressionadas
    if (p1_key === "W" && p1_y > 0) {
        p1_y -= paddleSpeed;
    } else if (p1_key === "S" && p1_y + paddleHeight < canvasHeight) {
        p1_y += paddleSpeed;
    }
    if (p2_key === "ArrowUp" && p2_y > 0) {
        p2_y -= paddleSpeed;
    } else if (p2_key === "ArrowDown" && p2_y + paddleHeight < canvasHeight) {
        p2_y += paddleSpeed;
    }

    // Desenha todos os elementos do jogo
    draw();
}

function initBall(){
    ball_x = canvasWidth / 2 - ballSize / 2;
    ball_y = canvasHeight / 2 - ballSize / 2;
    ball_speed_x = Math.random() < 0.5 ? -5 : 5;
    ball_speed_y = Math.random() < 0.5 ? -5 : 5;
}

function draw(){
    // Limpa o canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Desenha as barras dos jogadores
    ctx.fillStyle = "#fff";
    ctx.fillRect(10, p1_y, paddleWidth, paddleHeight);
    ctx.fillRect(canvasWidth - paddleWidth - 10, p2_y, paddleWidth, paddleHeight);

    // Desenha a bola
    ctx.fillRect(ball_x, ball_y, ballSize, ballSize);

    // Escreve os pontos dos jogadores
    ctx.font = "50px monospace";
    ctx.fillText(p1_points, canvasWidth / 4, 50);
    ctx.fillText(p2_points, 3 * (canvasWidth / 4), 50);
}

// Registra as teclas pressionadas pelos jogadores
document.addEventListener("keydown", function(ev){
    if (ev.key === "W" || ev.key === "S") {
        p1_key = ev.key;
    } else if (ev.key === "ArrowUp" || ev.key === "ArrowDown") {
        p2_key = ev.key;
    }
});

setup();

"use strict";
let gameState = "start";
let board = document.getElementById("board") as HTMLDivElement;
let board_coord = board.getBoundingClientRect() as DOMRect;
let paddle_1 = document.getElementById("paddle_1") as HTMLDivElement;
let paddle_2 = document.getElementById("paddle_2") as HTMLDivElement;
let paddle_1_coord = paddle_1.getBoundingClientRect() as DOMRect;
let paddle_2_coord = paddle_2.getBoundingClientRect() as DOMRect;
let paddles = document.querySelector(".paddle")?.getBoundingClientRect() as DOMRect;
let ball = document.getElementById("ball") as HTMLDivElement;
let ball_coord: any = document.getElementById("ball")?.getBoundingClientRect() as DOMRect;
let score_1: any = document.getElementById("player_1_score") as HTMLDivElement;
let score_2: any = document.getElementById("player_2_score") as HTMLDivElement;
let message = document.getElementById("message") as HTMLDivElement;
let ballSpeed: number = 1;
let ballX: number = ball_coord.left;
let ballY: number = ball_coord.top;
let ballXDirection: number;
let ballYDirection: number;
let ballRadius: any = ball.style.borderRadius;

function initGame() {
  document.addEventListener("keydown", (e) => {
    const keyPressed = e.key;
    if (keyPressed === "Enter") {
      gameState = "play";
      message.innerHTML = "Game Started";
      message.style.left = 42 + "vw";
      paddlesKeys();
      ball.style.visibility = "visible";
      requestAnimationFrame(moveBall);
      checkCollision();
    }
  });
}
initGame();

function paddlesKeys() {
  if (gameState === "play") {
    document.addEventListener("keydown", (e) => {
      const keyPressed = e.key;
      const paddle1Up = "w";
      const paddle1Down = "s";
      const paddle2Up = "ArrowUp";
      const paddle2Down = "ArrowDown";
      switch (keyPressed) {
        case paddle1Up:
          paddle_1.style.top =
            Math.max(
              board_coord.top + 8,
              paddle_1_coord.top - window.innerHeight * 0.06
            ) + "px";
          paddle_1_coord = paddle_1.getBoundingClientRect();
          break;
        case paddle1Down:
          paddle_1.style.top =
            Math.min(
              board_coord.bottom - 8 - paddles.height,
              paddle_1_coord.top + window.innerHeight * 0.06
            ) + "px";
          paddle_1_coord = paddle_1.getBoundingClientRect();
          break;
        case paddle2Up:
          paddle_2.style.top =
            Math.max(
              board_coord.top + 8,
              paddle_2_coord.top - window.innerHeight * 0.1
            ) + "px";
          paddle_2_coord = paddle_2.getBoundingClientRect();
          break;
        case paddle2Down:
          paddle_2.style.top =
            Math.min(
              board_coord.bottom - 8 - paddles.height,
              paddle_2_coord.top + window.innerHeight * 0.1
            ) + "px";
          paddle_2_coord = paddle_2.getBoundingClientRect();
          break;
      }
    });
  }
}

function checkCollision() {
  if (ballY <= 0 + ballRadius) {
    ballYDirection *= -1;
  }
  if (ballY >= board_coord.height - ballRadius) {
    ballYDirection *= -1;
  }
  if (ballX <= 0) {
    score_2 += 1;
    resetGame();
    initGame();
  }
  if (ballX >= board_coord.width) {
    score_1 += 1;
    resetGame();
    initGame();
  }
  if (ballX <= paddle_1_coord.left + paddles.width + ballRadius) {
    if (ballY > paddle_1_coord.top && ballY <paddle_1_coord.top + paddles.height) {
      ballX = paddle_1_coord.left + paddles.width + ballRadius; // if ball gets stuck
      ballXDirection *= -1;
      ballSpeed += 1;
    }
  }
  if (ballX >= paddle_2_coord.right - ballRadius) {
    if (ballY > paddle_2_coord.top && ballY < paddle_2_coord.top + paddles.height) {
      ballX = paddle_2_coord.right - ballRadius; // if ball gets stuck
      ballXDirection *= -1;
      ballSpeed += 1;
    }
  }
}

function moveBall() {
  if ((gameState = "play")) {
    console.log(ballX);

    if (Math.round(Math.random()) == 1) {
      ballXDirection = 1;
    } else {
      ballXDirection = -1;
    }
    if (Math.round(Math.random()) == 1) {
      ballYDirection = Math.random() * 1; //more random directions
    } else {
      ballYDirection = Math.random() * -1; //more random directions
    }
    ballX = ballSpeed * ballXDirection;
    ballY = ballSpeed * ballYDirection;
    console.log(ballX);
  }
}

function resetGame() {
  gameState = "start";
  message.innerHTML = "Press Enter to Play";
  message.style.left = 38 + "vw";
  ball.style.visibility = "hidden";
  ball.style.setProperty('top', ball_coord.top);
  ball.style.setProperty('left', ball_coord.left);
  ball_coord = ball.getBoundingClientRect();
  //   paddle_1.style.top = "calc(7.5vh + 55px)";
  //   paddle_1.style.left = "calc(10vw + 30px)";
  //   paddle_2.style.top = "calc(85vh + 7.5vh - 100px - 55px)";
  //   paddle_2.style.right = "calc(10vw + 30px)";
  return;
}
const BG_COLOR = '#231f20';
const SNAKE_COLOR = '#c2c2c2';
const FOOD_COLOR = '#e66916';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = canvas.height = 400;

const FRAME_RATE = 10;
const PIXEL_SIZE = 20;
const PIXEL_COUNT = canvas.width / PIXEL_SIZE;

let position, velocity, food, snake;

function init() {
  position = { x: 10, y: 10 };
  velocity = { x: 0, y: 0 };

  snake = [
    { x: 8, y: 10 },
    { x: 9, y: 10 },
    { x: 10, y: 10 },
  ];

  randomFood();
}

init();

function randomFood() {
  food = {
    x: Math.floor(Math.random() * PIXEL_COUNT),
    y: Math.floor(Math.random() * PIXEL_COUNT),
  };

  for (let cell of snake) {
    if (cell.x === food.x && food.y === cell.y) {
      return randomFood();
    }
  }
}

document.addEventListener('keydown', keydown);

function keydown(e) {
  switch (e.keyCode) {
    case 37: {
      return (velocity = { x: -1, y: 0 });
    }
    case 38: {
      return (velocity = { x: 0, y: -1 });
    }
    case 39: {
      return (velocity = { x: 1, y: 0 });
    }
    case 40: {
      return (velocity = { x: 0, y: 1 });
    }
  }
}

setInterval(() => {
  requestAnimationFrame(gameLoop);
}, 1000 / FRAME_RATE);

function gameLoop() {
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = SNAKE_COLOR;
  for (let cell of snake) {
    ctx.fillRect(
      cell.x * PIXEL_SIZE,
      cell.y * PIXEL_SIZE,
      PIXEL_SIZE,
      PIXEL_SIZE
    );
  }

  ctx.fillStyle = FOOD_COLOR;
  ctx.fillRect(
    food.x * PIXEL_SIZE,
    food.y * PIXEL_SIZE,
    PIXEL_SIZE,
    PIXEL_SIZE
  );

  position.x += velocity.x;
  position.y += velocity.y;

  if (
    position.x < 0 ||
    position.x > PIXEL_COUNT ||
    position.y < 0 ||
    position.y > PIXEL_COUNT
  ) {
    init();
  }

  if (food.x === position.x && food.y === position.y) {
    snake.push({ ...position });
    position.x += velocity.x;
    position.y += velocity.y;
    randomFood();
  }

  if (velocity.x != 0 || velocity.y != 0) {
    for (let cell of snake) {
      if (cell.x === position.x && cell.y === position.y) {
        return init();
      }
    }
    snake.push({ ...position });
    snake.shift();
  }
}

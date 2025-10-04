const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const cols = 10;
const rows = 10;
const cellwidth = Math.floor(canvas.width / cols);
const cellheight = Math.floor(canvas.height / rows);

c.font = `${Math.min(cellwidth, cellheight) / 2}px Arial`;
c.textAlign = 'center';
c.textBaseline = 'middle';

let number = 1;
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const actualCol = (row % 2 === 0 ? col : cols - 1 - col);
    const x = actualCol * cellwidth;
    const y = (rows - 1 - row) * cellheight;

    c.strokeRect(x, y, cellwidth, cellheight);
    c.fillStyle = 'rgb(30,30,30)';
    c.fillText(number, x + cellwidth / 2, y + cellheight / 2);
    number++;

    if(number%3==0){
      c.fillStyle = 'rgba(173, 216, 230, 0.5)';
      c.fillRect(x, y, cellwidth, cellheight);
    }
    else if(number%3==1){
      c.fillStyle = 'rgba(128, 0, 128, 0.5)';
      c.fillRect(x, y, cellwidth, cellheight);
    }
    else {
      c.fillStyle = 'rgba(255, 182, 193, 0.5)';
      c.fillRect(x, y, cellwidth, cellheight);
    }
  }
}


const snakes = [
  { from: 99, to: 7 },
  { from: 70, to: 55 },
  { from: 52, to: 35 },
  { from: 37, to: 2 },
  { from: 95, to: 72 }
];


const ladders = [
  { from: 6, to: 25 },
  { from: 11, to: 32 },
  { from: 60, to: 81 },
  { from: 46, to: 93 },
  { from: 17, to: 65 }
];


function getCellPosition(number) {
  number = number - 1;
  const row = Math.floor(number / cols);
  const col = number % cols;
  const actualCol = (row % 2 === 0 ? col : cols - 1 - col);
  const x = actualCol * cellwidth;
  const y = (rows - 1 - row) * cellheight;
  return { x, y };
}


const snakeControlPoints = snakes.map(snake => {
  const start = getCellPosition(snake.from);
  const end = getCellPosition(snake.to);
  const startX = start.x + cellwidth / 2;
  const startY = start.y + cellheight / 2;
  const endX = end.x + cellwidth / 2;
  const endY = end.y + cellheight / 2;
  return {
    startX, startY, endX, endY,
    controlX: (startX + endX) / 2 + (Math.random() - 0.5) * cellwidth,
    controlY: (startY + endY) / 2
  };
});


function drawSnakes() {
  snakeControlPoints.forEach(snake => {
    c.beginPath();
    c.moveTo(snake.startX, snake.startY);
    c.quadraticCurveTo(snake.controlX, snake.controlY, snake.endX, snake.endY);
    c.strokeStyle = '#2d5016';
    c.lineWidth = 8;
    c.stroke();
    
    c.strokeStyle = '#4a7c23';
    c.lineWidth = 5;
    c.stroke();

    c.beginPath();
    c.arc(snake.startX, snake.startY, 15, 0, Math.PI * 2);
    c.fillStyle = '#2d5016';
    c.fill();
    c.strokeStyle = '#1a3010';
    c.lineWidth = 2;
    c.stroke();

    c.beginPath();
    c.arc(snake.startX - 5, snake.startY - 3, 3, 0, Math.PI * 2);
    c.arc(snake.startX + 5, snake.startY - 3, 3, 0, Math.PI * 2);
    c.fillStyle = 'red';
    c.fill();

    c.beginPath();
    c.arc(snake.endX, snake.endY, 8, 0, Math.PI * 2);
    c.fillStyle = '#2d5016';
    c.fill();
  });
}


function drawLadders() {
  ladders.forEach(ladder => {
    const start = getCellPosition(ladder.from);
    const end = getCellPosition(ladder.to);
    
    const startX = start.x + cellwidth / 2;
    const startY = start.y + cellheight / 2;
    const endX = end.x + cellwidth / 2;
    const endY = end.y + cellheight / 2;

    c.strokeStyle = '#8B4513';
    c.lineWidth = 8;
    c.beginPath();
    c.moveTo(startX - 10, startY);
    c.lineTo(endX - 10, endY);
    c.stroke();
    
    c.beginPath();
    c.moveTo(startX + 10, startY);
    c.lineTo(endX + 10, endY);
    c.stroke();

    const rungs = 5;
    for (let i = 0; i <= rungs; i++) {
      const t = i / rungs;
      const x = startX + (endX - startX) * t;
      const y = startY + (endY - startY) * t;
      c.beginPath();
      c.moveTo(x - 10, y);
      c.lineTo(x + 10, y);
      c.strokeStyle = '#A0522D';
      c.lineWidth = 5;
      c.stroke();
    }
  });
}


drawSnakes();
drawLadders();

function drawDiceFace(number, x, y, size) {
  c.fillStyle = 'grey';
  c.fillRect(x, y, size, size);
  c.strokeStyle = 'black';
  c.lineWidth = 3;
  c.strokeRect(x, y, size, size);

  c.fillStyle = 'black';
  c.font = `bold ${size * 0.6}px Arial`;
  c.textAlign = 'center';
  c.textBaseline = 'middle';
  c.fillText(number, x + size / 2, y + size / 2);
}

const h = cellheight/2;
const w = cellwidth/2;
const min1= Math.min(h,w);
const x1= canvas.width/2 - min1/2;
const y1= canvas.height/2 - min1/2;

let diceValue = Math.floor(Math.random() * 6) + 1;
drawDiceFace(diceValue, x1, y1, min1);


let playerPosition = 0;

function drawPlayer(position) {
  if (position === 0) return;
  const pos = getCellPosition(position);
  c.beginPath();
  c.arc(pos.x + cellwidth / 2, pos.y + cellheight / 2, 20, 0, Math.PI * 2);
  c.fillStyle = 'red';
  c.fill();
  c.strokeStyle = 'darkred';
  c.lineWidth = 3;
  c.stroke();
}

drawPlayer(playerPosition);

canvas.addEventListener('click', function (e) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  if (
    mouseX >= x1 && mouseX <= x1 + min1 &&
    mouseY >= y1 && mouseY <= y1 + min1
  ) {
    diceValue = Math.floor(Math.random() * 6) + 1;
    
    
    c.clearRect(0, 0, canvas.width, canvas.height);
    
    let num = 1;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const actualCol = (row % 2 === 0 ? col : cols - 1 - col);
        const x = actualCol * cellwidth;
        const y = (rows - 1 - row) * cellheight;

        c.strokeRect(x, y, cellwidth, cellheight);
        c.fillStyle = 'rgb(30,30,30)';
        c.font = `${Math.min(cellwidth, cellheight) / 2}px Arial`;
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillText(num, x + cellwidth / 2, y + cellheight / 2);
        num++;

        if(num%3==0){
          c.fillStyle = 'rgba(173, 216, 230, 0.5)';
          c.fillRect(x, y, cellwidth, cellheight);
        }
        else if(num%3==1){
          c.fillStyle = 'rgba(128, 0, 128, 0.5)';
          c.fillRect(x, y, cellwidth, cellheight);
        }
        else {
          c.fillStyle = 'rgba(255, 182, 193, 0.5)';
          c.fillRect(x, y, cellwidth, cellheight);
        }
      }
    }
    
    
    drawSnakes();
    drawLadders();
    
    
    playerPosition += diceValue;
    if (playerPosition > 100) {
      playerPosition = 100;
    }
    
   
    const snakeHit = snakes.find(s => s.from === playerPosition);
    if (snakeHit) {
      playerPosition = snakeHit.to;
    }
    
    
    const ladderHit = ladders.find(l => l.from === playerPosition);
    if (ladderHit) {
      playerPosition = ladderHit.to;
    }
    
    drawPlayer(playerPosition);
    drawDiceFace(diceValue, x1, y1, min1);
    
    if (playerPosition === 100) {
      c.fillStyle = 'rgba(0, 0, 0, 0.7)';
      c.fillRect(0, 0, canvas.width, canvas.height);
      c.fillStyle = 'gold';
      c.font = 'bold 60px Arial';
      c.textAlign = 'center';
      c.fillText('YOU WIN!', canvas.width / 2, canvas.height / 2);
    }
  }
});
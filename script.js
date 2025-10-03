
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Resize canvas to fill window
//function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
 // drawGrid(); // redraw after resize
//}
//window.addEventListener('resize', resizeCanvas);
//resizeCanvas(); // initial call

//function drawGrid() {
  const cols = 10;
  const rows = 10;
  const cellwidth = Math.floor(canvas.width / cols);
  const cellheight = Math.floor(canvas.height / rows);

  //c.clearRect(0, 0, canvas.width, canvas.height); // clear before redraw
  c.font = `${Math.min(cellwidth, cellheight) / 2}px Arial`;
  c.textAlign = 'center';
  c.textBaseline = 'middle';

  let number = 1;
  for (let row = rows - 1; row >= 0; row--) {
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
    else
    {
    c.fillStyle = 'rgba(255, 182, 193, 0.5)';
    c.fillRect(x, y, cellwidth, cellheight);
    }
    }
  }

  function drawDiceFace(number, x, y, size) {
  c.fillStyle = 'grey';
  c.fillRect(x, y, size, size);
  c.strokeStyle = 'black';
  c.lineWidth = 2;
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


// Initial dice face
let diceValue = Math.floor(Math.random() * 6) + 1;
drawDiceFace(diceValue, x1, y1, min1);

canvas.addEventListener('click', function (e) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  if (
    mouseX >= x1 && mouseX <= x1 + min1 &&
    mouseY >= y1 && mouseY <= y1 + min1
  ) {
    diceValue = Math.floor(Math.random() * 6) + 1;
    drawDiceFace(diceValue, x1, y1, min1);
  }
});







function setup() {
  // Cria um canvas responsivo adaptado à largura da tela
  let container = document.getElementById('canvas-container');
  let canvasWidth = container.offsetWidth > 400 ? 400 : container.offsetWidth - 20;
 
  let canvas = createCanvas(canvasWidth, 200);
  canvas.parent('canvas-container');
}

function draw() {
  background(240);
 
  // Animacao simples de um conceito de "átomo" ou "órbita"
  translate(width / 2, height / 2);
 
  fill(30, 60, 114);
  noStroke();
  ellipse(0, 0, 30, 30); // Centro
 
  noFill();
  stroke(30, 60, 114, 100);
  strokeWeight(2);
  ellipse(0, 0, 100, 100); // orbita
 
  // Particula em movimento
  let angle = frameCount * 0.05;
  let x = cos(angle) * 50;
  let y = sin(angle) * 50;
 
  fill(255, 99, 71);
  noStroke();
  ellipse(x, y, 12, 12);
}

// Ajusta o canvas se a janela do navegador mudar de tamanho
function windowResized() {
  let container = document.getElementById('canvas-container');
  let canvasWidth = container.offsetWidth > 400 ? 400 : container.offsetWidth - 20;
  resizeCanvas(canvasWidth, 200);
}
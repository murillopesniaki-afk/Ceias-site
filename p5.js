// --- LÓGICA DE NAVEGAÇÃO DAS ABAS ---
function showPage(pageId) {
  // Esconde todas as seções
  let pages = document.querySelectorAll('.tab-content');
  pages.forEach(page => page.classList.remove('active'));

  // Remove o estado ativo de todos os botões
  let buttons = document.querySelectorAll('.nav-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  // Ativa a seção selecionada
  document.getElementById(pageId).classList.add('active');

  // Adiciona a classe ativa ao botão clicado
  event.currentTarget.classList.add('active');
}

// --- SIMULAÇÃO INTERATIVA EM P5.JS ---
let particles = [];

function setup() {
  let container = document.getElementById('canvas-container');
  let canvasWidth = container.offsetWidth > 600 ? 600 : container.offsetWidth - 10;
 
  let canvas = createCanvas(canvasWidth, 300);
  canvas.parent('canvas-container');

  // Cria um grupo de partículas
  for (let i = 0; i < 30; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(240, 244, 248);

  // Desenha e atualiza as partículas
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
    particles[i].checkMouse();
  }
}

// Classe que define o comportamento de cada partícula
class Particle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(8, 16);
    this.speedX = random(-1.5, 1.5);
    this.speedY = random(-1.5, 1.5);
    this.color = color(30, 60, 114, 180);
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Rebate nas bordas do canvas
    if (this.x < 0 || this.x > width) this.speedX *= -1;
    if (this.y < 0 || this.y > height) this.speedY *= -1;
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }

  checkMouse() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < 50) {
      this.color = color(255, 107, 107); // Muda de cor se o ponteiro/toque passar perto
    } else {
      this.color = color(30, 60, 114, 180);
    }
  }
}

// Redimensionamento dinâmico do Canvas para telas responsivas
function windowResized() {
  let container = document.getElementById('canvas-container');
  if (container) {
    let canvasWidth = container.offsetWidth > 600 ? 600 : container.offsetWidth - 10;
    resizeCanvas(canvasWidth, 300);
  }
}
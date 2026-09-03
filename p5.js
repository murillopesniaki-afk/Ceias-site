// --- LÓGICA DE NAVEGAÇÃO DAS ABAS (COM SUPORTE A EVENTOS) ---
function showPage(pageId, evt) {
  // Esconde todas as seções
  let pages = document.querySelectorAll('.tab-content');
  pages.forEach(page => page.classList.remove('active'));

  // Remove o estado ativo de todos os botões
  let buttons = document.querySelectorAll('.nav-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  // Ativa a seção selecionada
  let targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
  }

  // Adiciona a classe ativa ao botão clicado
  let currentBtn = evt ? evt.currentTarget : event?.currentTarget;
  if (currentBtn) {
    currentBtn.classList.add('active');
  }
}

// --- SIMULAÇÃO CIBERNÉTICA / REDE NEON EM P5.JS ---
let particles = [];
const MAX_PARTICLES = 45;

function setup() {
  let container = document.getElementById('canvas-container');
  let canvasWidth = container ? (container.offsetWidth > 800 ? 800 : container.offsetWidth - 20) : 600;
 
  let canvas = createCanvas(canvasWidth, 350);
  if (container) canvas.parent('canvas-container');

  // Cria o enxame inicial de partículas cibernéticas
  for (let i = 0; i < MAX_PARTICLES; i++) {
    particles.push(new CyberParticle());
  }
}

function draw() {
  // Fundo escuro profundo cibernético com rastro suave
  background(11, 14, 20);

  // Desenha as conexões luminosas entre partículas próximas
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      let d = dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
      if (d < 100) {
        let alpha = map(d, 0, 100, 200, 0);
        stroke(0, 240, 255, alpha);
        strokeWeight(1);
        line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
      }
    }
  }

  // Atualiza, exibe e processa interações de cada partícula
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
    particles[i].checkMouse();
  }
}

// Cria uma nova partícula ao clicar ou tocar na tela
function mousePressed() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    particles.push(new CyberParticle(mouseX, mouseY));
    if (particles.length > MAX_PARTICLES + 15) {
      particles.shift(); // Mantém o desempenho
    }
  }
}

// Classe das Partículas Futuristas
class CyberParticle {
  constructor(px, py) {
    this.x = px !== undefined ? px : random(width);
    this.y = py !== undefined ? py : random(height);
    this.size = random(4, 8);
    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);
    this.baseColor = color(0, 240, 255, 200); // Azul Neon / Cyan
    this.highlightColor = color(255, 255, 255); // Branco Neon
    this.currentColor = this.baseColor;
    this.isGlowing = false;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Rebate suavemente nas bordas
    if (this.x < 0 || this.x > width) this.speedX *= -1;
    if (this.y < 0 || this.y > height) this.speedY *= -1;
  }

  display() {
    noStroke();
    
    // Efeito de iluminação (brilho externo)
    if (this.isGlowing) {
      fill(0, 240, 255, 50);
      ellipse(this.x, this.y, this.size * 3.5);
    }
    
    fill(this.currentColor);
    ellipse(this.x, this.y, this.size);
  }

  checkMouse() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < 70) {
      this.currentColor = this.highlightColor;
      this.isGlowing = true;
      
      // Conexão direta de energia com o cursor
      stroke(0, 240, 255, 180);
      strokeWeight(1.5);
      line(mouseX, mouseY, this.x, this.y);
    } else {
      this.currentColor = this.baseColor;
      this.isGlowing = false;
    }
  }
}

// Redimensionamento dinâmico e responsivo
function windowResized() {
  let container = document.getElementById('canvas-container');
  if (container) {
    let canvasWidth = container.offsetWidth > 800 ? 800 : container.offsetWidth - 20;
    resizeCanvas(canvasWidth, 350);
  }
}
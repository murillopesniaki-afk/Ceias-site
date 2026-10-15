// =============================================
// 1. IMAGENS TEMÁTICAS POR DISCIPLINA
// =============================================

const fotosPorMateria = {
  "Língua Portuguesa": "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80",
  "Matemática": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80",
  "Ciências / Biologia": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",
  "História": "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=600&q=80",
  "Geografia": "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80",
  "Física / Química": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80",
  "Educação Física": "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=600&q=80",
  "Inglês": "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=600&q=80",
  "Artes": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80",
  "Filosofia / Sociologia": "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80",
  "Agroecologia / Campo": "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80"
};

const fotoPadrao =
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80";

// =============================================
// 2. LISTA DE PROFESSORES
// =============================================

const professores = [
  { nome: "Alceu", materia: "Língua Portuguesa", nivel: "Ensino Fundamental II e Médio" },
  { nome: "Henrique", materia: "Matemática", nivel: "Ensino Médio" },
  { nome: "Erli", materia: "Ciências / Biologia", nivel: "Ensino Fundamental II e Médio" },
  { nome: "Vandré", materia: "História", nivel: "Ensino Fundamental II" },
  { nome: "Sidnei", materia: "Geografia", nivel: "Ensino Fundamental II e Médio" },
  { nome: "Marcos / Christian", materia: "Física / Química", nivel: "Ensino Médio" },
  { nome: "Roberto", materia: "Educação Física", nivel: "Ensino Fundamental II e Médio" },
  { nome: "Susana", materia: "Inglês", nivel: "Ensino Fundamental II e Médio" },
  { nome: "Sandra", materia: "Artes", nivel: "Ensino Fundamental II" },
  { nome: "Rafael", materia: "Filosofia / Sociologia", nivel: "Ensino Médio" },
  { nome: "Beatriz Ribeiro", materia: "Agroecologia / Campo", nivel: "Ensino Fundamental II e Médio" },
  { nome: "Adilson", materia: "Matemática", nivel: "Ensino Fundamental II" },
  { nome: "Geovana", materia: "Língua Portuguesa", nivel: "Ensino Fundamental II" },
  { nome: "Vandré", materia: "História", nivel: "Ensino Médio" },
  { nome: "Sidnei", materia: "Geografia", nivel: "Ensino Fundamental II" },
  { nome: "Erli", materia: "Ciências / Biologia", nivel: "Ensino Fundamental II" },
  { nome: "Geovana", materia: "Inglês", nivel: "Ensino Médio" },
  { nome: "Christian", materia: "Física / Química", nivel: "Ensino Médio" },
  { nome: "Roberto", materia: "Educação Física", nivel: "Ensino Fundamental II" },
  { nome: "Rodrigo Xavier", materia: "Agroecologia / Campo", nivel: "Ensino Médio" },
  { nome: "Paula", materia: "Matemática", nivel: "Ensino Médio" }
];

// =============================================
// 3. INICIALIZAÇÃO
// =============================================

document.addEventListener("DOMContentLoaded", () => {
  const criarIcones = () => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  };

  criarIcones();

  // ===========================================
  // 4. MENU PARA CELULARES
  // ===========================================

  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.setAttribute("aria-expanded", "false");

    function fecharMenu() {
      mobileMenu.classList.add("hidden");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Abrir menu");
      menuBtn.innerHTML =
        '<i data-lucide="menu" class="w-6 h-6"></i>';
      criarIcones();
    }

    menuBtn.addEventListener("click", () => {
      const vaiAbrir = mobileMenu.classList.contains("hidden");

      mobileMenu.classList.toggle("hidden");
      menuBtn.setAttribute("aria-expanded", String(vaiAbrir));
      menuBtn.setAttribute(
        "aria-label",
        vaiAbrir ? "Fechar menu" : "Abrir menu"
      );
      menuBtn.innerHTML = vaiAbrir
        ? '<i data-lucide="x" class="w-6 h-6"></i>'
        : '<i data-lucide="menu" class="w-6 h-6"></i>';

      criarIcones();
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", fecharMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") fecharMenu();
    });
  }

  // ===========================================
  // 5. PROFESSORES: CARDS, BUSCA E FILTROS
  // ===========================================

  const teachersGrid = document.getElementById("teachers-grid");
  const teacherSearch = document.getElementById("teacher-search");
  const teacherFilter = document.getElementById("teacher-filter");
  const noTeachersFound = document.getElementById("no-teachers-found");

  if (teachersGrid) {
    function criarCard(professor) {
      const card = document.createElement("article");
      card.className =
        "bg-white rounded-2xl shadow-sm border border-slate-200 " +
        "overflow-hidden hover:shadow-lg hover:-translate-y-1 " +
        "transition duration-300 flex flex-col";

      const imagemContainer = document.createElement("div");
      imagemContainer.className =
        "h-40 w-full relative overflow-hidden bg-slate-200";

      const imagem = document.createElement("img");
      imagem.src = fotosPorMateria[professor.materia] || fotoPadrao;
      imagem.alt = "Imagem ilustrativa de " + professor.materia;
      imagem.loading = "lazy";
      imagem.decoding = "async";
      imagem.className =
        "w-full h-full object-cover transition-transform duration-500 " +
        "hover:scale-105";

      imagem.addEventListener("error", () => {
        if (imagem.dataset.fallbackApplied !== "true") {
          imagem.dataset.fallbackApplied = "true";
          imagem.src = fotoPadrao;
        } else {
          imagem.style.display = "none";
        }
      });

      const degradado = document.createElement("div");
      degradado.className =
        "absolute inset-0 bg-gradient-to-t from-black/70 to-transparent " +
        "pointer-events-none";

      const materia = document.createElement("span");
      materia.className =
        "absolute bottom-3 left-3 right-3 w-fit max-w-[90%] " +
        "bg-yellow-400 text-slate-900 text-xs font-extrabold " +
        "px-3 py-1.5 rounded-md shadow";
      materia.textContent = professor.materia;

      imagemContainer.append(imagem, degradado, materia);

      const conteudo = document.createElement("div");
      conteudo.className = "p-5 flex items-start gap-3 flex-1";

      const avatar = document.createElement("div");
      avatar.className =
        "w-11 h-11 rounded-full bg-blue-900 text-yellow-300 " +
        "flex items-center justify-center shrink-0 font-bold text-lg " +
        "border-2 border-yellow-400/60 shadow-sm";
      avatar.textContent = professor.nome.charAt(0).toLocaleUpperCase("pt-BR");
      avatar.setAttribute("aria-hidden", "true");

      const informacoes = document.createElement("div");
      informacoes.className = "min-w-0";

      const nome = document.createElement("h4");
      nome.className = "font-bold text-slate-900 leading-snug break-words";
      nome.textContent = professor.nome;

      const iconeLinha = document.createElement("div");
      iconeLinha.className =
        "flex items-start gap-1.5 mt-2 text-xs text-slate-500";

      const icone = document.createElement("i");
      icone.setAttribute("data-lucide", "book-open");
      icone.className = "w-4 h-4 text-green-700 shrink-0";

      const nivel = document.createElement("p");
      nivel.className = "leading-relaxed";
      nivel.textContent = professor.nivel;

      iconeLinha.append(icone, nivel);
      informacoes.append(nome, iconeLinha);
      conteudo.append(avatar, informacoes);
      card.append(imagemContainer, conteudo);

      return card;
    }

    function renderProfessores(lista) {
      teachersGrid.replaceChildren();

      const fragmento = document.createDocumentFragment();

      lista.forEach((professor) => {
        fragmento.appendChild(criarCard(professor));
      });

      teachersGrid.appendChild(fragmento);

      if (noTeachersFound) {
        noTeachersFound.classList.toggle("hidden", lista.length > 0);
        noTeachersFound.textContent =
          "Nenhum professor encontrado com os critérios digitados.";
      }

      criarIcones();
    }

    function filtrarProfessores() {
      const termo = (teacherSearch?.value || "")
        .trim()
        .toLocaleLowerCase("pt-BR");

      const materiaSelecionada = teacherFilter?.value || "todos";

      const resultado = professores.filter((professor) => {
        const nomeNormalizado = professor.nome
          .toLocaleLowerCase("pt-BR");

        const materiaNormalizada = professor.materia
          .toLocaleLowerCase("pt-BR");

        const nivelNormalizado = professor.nivel
          .toLocaleLowerCase("pt-BR");

        const correspondeBusca =
          nomeNormalizado.includes(termo) ||
          materiaNormalizada.includes(termo) ||
          nivelNormalizado.includes(termo);

        const correspondeMateria =
          materiaSelecionada === "todos" ||
          professor.materia === materiaSelecionada;

        return correspondeBusca && correspondeMateria;
      });

      renderProfessores(resultado);
    }

    teacherSearch?.addEventListener("input", filtrarProfessores);
    teacherFilter?.addEventListener("change", filtrarProfessores);

    // Corrige opções antigas ou abreviadas do HTML.
    if (teacherFilter) {
      const aliases = {
        "Português": "Língua Portuguesa"
      };

      Array.from(teacherFilter.options).forEach((option) => {
        if (aliases[option.value]) {
          option.value = aliases[option.value];
        }
      });
    }

    renderProfessores(professores);
  }

  // ===========================================
  // 6. GERADOR DE PROMPTS ESCOLARES
  // ===========================================

  const btnGenerate = document.getElementById("btn-generate");
  const userRole = document.getElementById("user-role");
  const promptGoal = document.getElementById("prompt-goal");
  const topicInput = document.getElementById("topic-input");
  const resultBox = document.getElementById("result-box");
  const generatedPromptText =
    document.getElementById("generated-prompt-text");
  const btnCopy = document.getElementById("btn-copy");
  const copyText = document.getElementById("copy-text");

  btnGenerate?.addEventListener("click", () => {
    const role = userRole?.value || "Aluno do Ensino Fundamental";
    const goal = promptGoal?.value || "Estudar um assunto escolar";
    const topic = topicInput?.value.trim() || "";

    if (!topic) {
      if (topicInput) {
        topicInput.setCustomValidity(
          "Digite uma matéria ou um tópico antes de gerar o prompt."
        );
        topicInput.reportValidity();
        topicInput.focus();
      }
      return;
    }

    topicInput?.setCustomValidity("");

    const prompt = [
      "Atue como um educador experiente, com explicações claras e adequadas ao nível de ensino.",
      "",
      "CONTEXTO ESCOLAR",
      "Colégio Estadual do Campo Irmã Ambrósia Sabatovich, localizado na Colônia Marcelino, em São José dos Pinhais, Paraná.",
      "",
      "PERFIL DO SOLICITANTE",
      role,
      "",
      "OBJETIVO",
      goal,
      "",
      "TEMA PRINCIPAL",
      topic,
      "",
      "INSTRUÇÕES",
      "1. Explique o conteúdo em etapas organizadas.",
      "2. Use linguagem adequada ao perfil do solicitante.",
      "3. Apresente exemplos práticos e situações do cotidiano.",
      "4. Quando pertinente, relacione o tema à Educação do Campo, à agricultura familiar, à sustentabilidade e à cultura regional.",
      "5. Inclua atividades ou perguntas para verificar a compreensão.",
      "6. Quando utilizar informações factuais, indique fontes confiáveis para consulta.",
      "7. Não invente dados sobre a escola nem referências bibliográficas.",
      "8. Respeite a privacidade dos estudantes, professores e familiares.",
      "",
      "Finalize com um resumo dos pontos principais e sugestões para aprofundar o aprendizado."
    ].join("\n");

    if (generatedPromptText && resultBox) {
      generatedPromptText.textContent = prompt;
      resultBox.classList.remove("hidden");

      if (copyText) copyText.textContent = "Copiar";

      resultBox.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "nearest"
      });
    }
  });

  topicInput?.addEventListener("input", () => {
    topicInput.setCustomValidity("");
  });

  // ===========================================
  // 7. COPIAR PROMPT COM TRATAMENTO DE ERROS
  // ===========================================

  async function copiarTexto(texto) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(texto);
      return true;
    }

    const area = document.createElement("textarea");
    area.value = texto;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.left = "-9999px";
    area.style.top = "0";

    document.body.appendChild(area);
    area.select();
    area.setSelectionRange(0, area.value.length);

    let sucesso = false;

    try {
      sucesso = document.execCommand("copy");
    } finally {
      area.remove();
    }

    if (!sucesso) {
      throw new Error("Não foi possível copiar automaticamente.");
    }

    return true;
  }

  btnCopy?.addEventListener("click", async () => {
    const texto = generatedPromptText?.textContent?.trim();

    if (!texto) return;

    if (copyText) copyText.textContent = "Copiando...";

    try {
      await copiarTexto(texto);

      if (copyText) copyText.textContent = "Copiado!";

      btnCopy.setAttribute("aria-label", "Prompt copiado");

      window.setTimeout(() => {
        if (copyText) copyText.textContent = "Copiar";
        btnCopy.setAttribute("aria-label", "Copiar prompt");
      }, 2000);
    } catch (erro) {
      if (copyText) copyText.textContent = "Selecione e copie";
      console.error("Erro ao copiar o prompt:", erro);
    }
  });

  // ===========================================
  // 8. ANO ATUAL NO RODAPÉ, SE HOUVER ELEMENTO
  // ===========================================

  const yearElement = document.getElementById("current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
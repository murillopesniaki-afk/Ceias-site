document.addEventListener("DOMContentLoaded", () => {
  function renderIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }
  renderIcons();

  // Navegação e Abas
  const tabs = document.querySelectorAll(".tab-content");
  const navButtons = document.querySelectorAll("[data-tab]");
  const navigationBar = document.getElementById("navigation-bar");
  const btnBack = document.getElementById("btn-back");
  const btnReturnHome = document.getElementById("btn-return-home");
  const currentTabTitle = document.getElementById("current-tab-title");

  const tabNames = {
    inicio: "Capa",
    noticias: "Notícias",
    galeria: "Galeria de Fotos",
    edicoes: "Edições PDF",
    docentes: "Corpo Docente",
    "gerador-prompt": "Gerador de Prompts"
  };

  function switchTab(tabId, pushToHistory = true) {
    tabs.forEach((tab) => tab.classList.add("hidden"));

    const targetTab = document.getElementById(`tab-${tabId}`);
    if (targetTab) {
      targetTab.classList.remove("hidden");
    } else {
      document.getElementById("tab-inicio").classList.remove("hidden");
      tabId = "inicio";
    }

    navButtons.forEach((btn) => {
      if (btn.getAttribute("data-tab") === tabId) {
        btn.classList.add("active", "bg-emerald-50", "text-emerald-800", "font-bold");
      } else {
        btn.classList.remove("active", "bg-emerald-50", "text-emerald-800", "font-bold");
      }
    });

    if (tabId === "inicio") {
      navigationBar?.classList.add("hidden");
      navigationBar?.classList.remove("flex");
      btnBack?.classList.add("hidden");
    } else {
      navigationBar?.classList.remove("hidden");
      navigationBar?.classList.add("flex");
      btnBack?.classList.remove("hidden");
      if (currentTabTitle) currentTabTitle.textContent = tabNames[tabId] || tabId;
    }

    if (pushToHistory) {
      history.pushState({ tab: tabId }, "", `#${tabId}`);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    renderIcons();
  }

  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabId = btn.getAttribute("data-tab");
      switchTab(tabId);
      const mobileMenu = document.getElementById("mobile-menu");
      if (mobileMenu) mobileMenu.classList.add("hidden");
    });
  });

  btnBack?.addEventListener("click", () => switchTab("inicio"));
  btnReturnHome?.addEventListener("click", () => switchTab("inicio"));

  window.addEventListener("popstate", (e) => {
    const tab = e.state?.tab || window.location.hash.replace("#", "") || "inicio";
    switchTab(tab, false);
  });

  const initialHash = window.location.hash.replace("#", "") || "inicio";
  switchTab(initialHash, false);

  // Menu Mobile
  const menuButton = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  menuButton?.addEventListener("click", () => mobileMenu?.classList.toggle("hidden"));

  // Formulário de Sugestão de Pauta
  const formPauta = document.getElementById("form-pauta");
  const pautaFeedback = document.getElementById("pauta-feedback");
  formPauta?.addEventListener("submit", (e) => {
    e.preventDefault();
    pautaFeedback?.classList.remove("hidden");
    formPauta.reset();
    setTimeout(() => pautaFeedback?.classList.add("hidden"), 3000);
  });

  // Corpo Docente
  const teachers = [
    { name: "Professor(a) de Língua Portuguesa", subject: "Português", description: "Língua Portuguesa e produção textual." },
    { name: "Professor(a) de Matemática", subject: "Matemática", description: "Raciocínio lógico e resolução de problemas." },
    { name: "Professor(a) de Ciências", subject: "Ciências / Biologia", description: "Ciências da natureza e sustentabilidade." },
    { name: "Professor(a) de História", subject: "História", description: "História, cultura e sociedade." },
    { name: "Professor(a) de Geografia", subject: "Geografia", description: "Território, paisagem e espaço geográfico." },
    { name: "Professor(a) de Física e Química", subject: "Física / Química", description: "Fenômenos naturais e experimentação." },
    { name: "Professor(a) de Educação Física", subject: "Educação Física", description: "Movimento, esporte e qualidade de vida." },
    { name: "Professor(a) de Inglês", subject: "Inglês", description: "Língua inglesa e comunicação." },
    { name: "Professor(a) de Artes", subject: "Artes", description: "Expressão artística e criatividade." },
    { name: "Professor(a) de Filosofia e Sociologia", subject: "Filosofia / Sociologia", description: "Pensamento crítico e vida em sociedade." },
    { name: "Professor(a) de Educação do Campo", subject: "Agroecologia / Campo", description: "Sustentabilidade e valorização da comunidade rural." }
  ];

  const teacherGrid = document.getElementById("teachers-grid");
  const teacherSearch = document.getElementById("teacher-search");
  const teacherFilter = document.getElementById("teacher-filter");
  const noTeachersFound = document.getElementById("no-teachers-found");

  function renderTeachers() {
    if (!teacherGrid) return;
    const query = (teacherSearch?.value || "").trim().toLocaleLowerCase("pt-BR");
    const subject = teacherFilter?.value || "todos";

    const filtered = teachers.filter((t) => {
      const matchName = t.name.toLocaleLowerCase("pt-BR").includes(query);
      const matchSubject = subject === "todos" || t.subject === subject;
      return matchName && matchSubject;
    });

    teacherGrid.replaceChildren();

    filtered.forEach((teacher) => {
      const card = document.createElement("article");
      card.className = "bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition duration-200";

      const avatar = document.createElement("div");
      avatar.className = "w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4";
      avatar.innerHTML = '<i data-lucide="user"></i>';

      const name = document.createElement("h4");
      name.className = "font-bold text-slate-900 text-base";
      name.textContent = teacher.name;

      const subjectLabel = document.createElement("p");
      subjectLabel.className = "inline-block mt-2 mb-3 text-xs font-semibold text-emerald-800 bg-emerald-50 rounded-full px-3 py-1";
      subjectLabel.textContent = teacher.subject;

      const description = document.createElement("p");
      description.className = "text-sm text-slate-600 leading-relaxed";
      description.textContent = teacher.description;

      card.append(avatar, name, subjectLabel, description);
      teacherGrid.appendChild(card);
    });

    if (noTeachersFound) noTeachersFound.classList.toggle("hidden", filtered.length > 0);
    renderIcons();
  }

  teacherSearch?.addEventListener("input", renderTeachers);
  teacherFilter?.addEventListener("change", renderTeachers);
  renderTeachers();

  // Gerador de Prompts
  const roleInput = document.getElementById("user-role");
  const goalInput = document.getElementById("prompt-goal");
  const topicInput = document.getElementById("topic-input");
  const generateButton = document.getElementById("btn-generate");
  const resultBox = document.getElementById("result-box");
  const generatedText = document.getElementById("generated-prompt-text");
  const copyButton = document.getElementById("btn-copy");
  const copyText = document.getElementById("copy-text");

  generateButton?.addEventListener("click", () => {
    const role = roleInput?.value || "Aluno do Ensino Fundamental";
    const goal = goalInput?.value || "Explicar um assunto escolar";
    const topic = topicInput?.value.trim();

    if (!topic) {
      topicInput?.focus();
      topicInput?.reportValidity();
      return;
    }

    const prompt = [
      "Atue como um educador experiente, com linguagem clara, acolhedora e adequada ao nível de ensino.",
      "",
      "CONTEXTO:",
      "Colégio Estadual do Campo Irmã Ambrósia Sabatovich, localizado na Colônia Marcelino, em São José dos Pinhais, Paraná.",
      "Considere a realidade da comunidade rural, a agricultura familiar, a sustentabilidade e a cultura regional quando forem relevantes.",
      "",
      "PERFIL DO SOLICITANTE:",
      role,
      "",
      "OBJETIVO:",
      goal,
      "",
      "TEMA:",
      topic,
      "",
      "ORIENTAÇÕES:",
      "- Organize a resposta em tópicos e etapas.",
      "- Explique os conceitos com exemplos práticos.",
      "- Utilize linguagem apropriada ao perfil informado.",
      "- Inclua atividades ou exemplos relacionados ao cotidiano quando fizer sentido.",
      "- Ao mencionar fatos, apresente fontes confiáveis para consulta.",
      "- Não invente dados, referências ou informações sobre a escola.",
      "- Preserve a privacidade de estudantes, professores e familiares.",
      "",
      "Ao final, apresente uma breve síntese e sugestões para aprofundar o aprendizado."
    ].join("\n");

    if (generatedText) generatedText.textContent = prompt;
    resultBox?.classList.remove("hidden");
    if (copyText) copyText.textContent = "Copiar";
  });

  copyButton?.addEventListener("click", async () => {
    const text = generatedText?.textContent || "";
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      if (copyText) copyText.textContent = "Copiado!";
    } catch {
      if (copyText) copyText.textContent = "Erro ao copiar";
    }
    setTimeout(() => {
      if (copyText) copyText.textContent = "Copiar";
    }, 2000);
  });
});

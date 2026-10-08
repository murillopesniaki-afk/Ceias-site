// Mapeamento de imagens ilustrativas dedicadas por matéria/disciplina
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

// Lista de professores com suas respectivas matérias
const professores = [
    { nome: "Ana Paula Silva", materia: "Língua Portuguesa", nivel: "Ensino Fundamental II e Médio" },
    { nome: "Carlos Eduardo Santos", materia: "Matemática", nivel: "Ensino Médio" },
    { nome: "Mariana Oliveira", materia: "Ciências / Biologia", nivel: "Ensino Fundamental II e Médio" },
    { nome: "Roberto Souza", materia: "História", nivel: "Ensino Fundamental II" },
    { nome: "Fernanda Lima", materia: "Geografia", nivel: "Ensino Fundamental II e Médio" },
    { nome: "Lucas Rodrigues", materia: "Física / Química", nivel: "Ensino Médio" },
    { nome: "Juliana Costa", materia: "Educação Física", nivel: "Ensino Fundamental II e Médio" },
    { nome: "Gabriel Pereira", materia: "Inglês", nivel: "Ensino Fundamental II e Médio" },
    { nome: "Camila Fernandes", materia: "Artes", nivel: "Ensino Fundamental II" },
    { nome: "Marcelo Alves", materia: "Filosofia / Sociologia", nivel: "Ensino Médio" },
    { nome: "Beatriz Ribeiro", materia: "Agroecologia / Campo", nivel: "Ensino Fundamental II e Médio" },
    { nome: "Ricardo Barbosa", materia: "Matemática", nivel: "Ensino Fundamental II" },
    { nome: "Patricia Gomez", materia: "Língua Portuguesa", nivel: "Ensino Fundamental II" },
    { nome: "Thiago Martins", materia: "História", nivel: "Ensino Médio" },
    { nome: "Vanessa Castro", materia: "Geografia", nivel: "Ensino Fundamental II" },
    { nome: "Diego Rocha", materia: "Ciências / Biologia", nivel: "Ensino Fundamental II" },
    { nome: "Renata Carvalho", materia: "Inglês", nivel: "Ensino Médio" },
    { nome: "André Luiz", materia: "Física / Química", nivel: "Ensino Médio" },
    { nome: "Aline Mendes", materia: "Educação Física", nivel: "Ensino Fundamental II" },
    { nome: "Rodrigo Xavier", materia: "Agroecologia / Campo", nivel: "Ensino Médio" },
    { nome: "Sandra Regina", materia: "Língua Portuguesa", nivel: "Ensino Médio" },
    { nome: "Marcos Paulo", materia: "Matemática", nivel: "Ensino Médio" }
];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar ícones Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Lógica do Menu Mobile
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // 3. Renderização dos Professores com Capa/Foto Temática da Matéria
    const teachersGrid = document.getElementById('teachers-grid');
    const teacherSearch = document.getElementById('teacher-search');
    const teacherFilter = document.getElementById('teacher-filter');
    const noTeachersFound = document.getElementById('no-teachers-found');

    function renderProfessores(lista) {
        if (!teachersGrid) return;
        teachersGrid.innerHTML = '';

        if (lista.length === 0) {
            noTeachersFound.classList.remove('hidden');
            return;
        } else {
            noTeachersFound.classList.add('hidden');
        }

        lista.forEach(prof => {
            // Obtém a imagem referente à matéria (ou uma padrão caso não encontre)
            const fotoMateria = fotosPorMateria[prof.materia] || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80";

            const card = document.createElement('div');
            card.className = "bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition flex flex-col";
            card.innerHTML = `
                <!-- Foto de Capa da Matéria -->
                <div class="h-36 w-full relative overflow-hidden bg-slate-200">
                    <img src="${fotoMateria}" alt="${prof.materia}" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <span class="absolute bottom-3 left-3 bg-brand-yellow text-slate-900 text-xs font-extrabold px-2.5 py-1 rounded-md shadow">
                        ${prof.materia}
                    </span>
                </div>

                <!-- Informações do Professor -->
                <div class="p-5 flex items-start gap-3 flex-1">
                    <div class="w-10 h-10 rounded-full bg-brand-blue text-brand-gold flex items-center justify-center shrink-0 font-bold text-base shadow border border-brand-yellow/50">
                        ${prof.nome.charAt(0)}
                    </div>
                    <div>
                        <h4 class="font-bold text-slate-900 leading-snug">${prof.nome}</h4>
                        <p class="text-xs text-slate-500 mt-1 flex items-center gap-1">
                            <i data-lucide="book-open" class="w-3.5 h-3.5 text-brand-green inline"></i>
                            ${prof.nivel}
                        </p>
                    </div>
                </div>
            `;
            teachersGrid.appendChild(card);
        });

        // Reinicializa os ícones gerados dinamicamente nos cartões
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    function filtrarProfessores() {
        const termoBusca = teacherSearch ? teacherSearch.value.toLowerCase() : '';
        const materiaFiltro = teacherFilter ? teacherFilter.value : 'todos';

        const resultado = professores.filter(prof => {
            const combinaNome = prof.nome.toLowerCase().includes(termoBusca);
            const combinaMateria = materiaFiltro === 'todos' || prof.materia === materiaFiltro;
            return combinaNome && combinaMateria;
        });

        renderProfessores(resultado);
    }

    if (teachersGrid) {
        renderProfessores(professores);

        if (teacherSearch) teacherSearch.addEventListener('input', filtrarProfessores);
        if (teacherFilter) teacherFilter.addEventListener('change', filtrarProfessores);
    }

    // 4. Lógica do Gerador de Prompts IA
    const btnGenerate = document.getElementById('btn-generate');
    const userRole = document.getElementById('user-role');
    const promptGoal = document.getElementById('prompt-goal');
    const topicInput = document.getElementById('topic-input');
    const resultBox = document.getElementById('result-box');
    const generatedPromptText = document.getElementById('generated-prompt-text');
    const btnCopy = document.getElementById('btn-copy');
    const copyText = document.getElementById('copy-text');

    if (btnGenerate) {
        btnGenerate.addEventListener('click', () => {
            const role = userRole ? userRole.value : 'Aluno';
            const goal = promptGoal ? promptGoal.value : 'Estudo';
            const topic = topicInput && topicInput.value.trim() !== '' 
                ? topicInput.value.trim() 
                : 'o conteúdo programático atual';

            const prompt = `Atue como um tutor pedagógico do Colégio Estadual do Campo Irmã Ambrósia Sabatovich (São José dos Pinhais - PR). Como ${role}, preciso da sua ajuda para ${goal}. O tópico principal é "${topic}". Por favor, adapte a explicação considerando o contexto da Educação do Campo, com linguagem acessível, exemplos práticos do cotidiano e foco no aprendizado sustentável.`;

            if (generatedPromptText && resultBox) {
                generatedPromptText.innerText = prompt;
                resultBox.classList.remove('hidden');
            }
        });
    }

    // 5. Botão de Copiar Prompt
    if (btnCopy && generatedPromptText && copyText) {
        btnCopy.addEventListener('click', () => {
            const textToCopy = generatedPromptText.innerText;
            navigator.clipboard.writeText(textToCopy).then(() => {
                copyText.innerText = 'Copiado!';
                setTimeout(() => {
                    copyText.innerText = 'Copiar';
                }, 2000);
            });
        });
    }
});
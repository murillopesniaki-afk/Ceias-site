// LISTA DE PROFESSORES (Fácil de alterar, adicionar ou remover novos nomes)
const professores = [
    { nome: "alceu", materia: "Língua Portuguesa", nivel: "Ensino Fundamental II e Médio" },
    { nome: "Henrique", materia: "Matemática", nivel: "Ensino Médio" },
    { nome: "Erli ", materia: "Ciências / Biologia", nivel: "Ensino Fundamental II e Médio" },
    { nome: "Vandre ", materia: "História", nivel: "Ensino Fundamental II" },
    { nome: "Sidnei", materia: "Geografia", nivel: "Ensino Fundamental II e Médio" },
    { nome: "Marcos/Christian", materia: "Física / Química", nivel: "Ensino Médio" },
    { nome: "Roberto", materia: "Educação Física", nivel: "Ensino Fundamental II e Médio" },
    { nome: "Susana", materia: "Inglês", nivel: "Ensino Fundamental II e Médio" },
    { nome: "Sandra", materia: "Artes", nivel: "Ensino Fundamental II" },
    { nome: "Rafael", materia: "Filosofia / Sociologia", nivel: "Ensino Médio" },
    { nome: "Beatriz Ribeiro", materia: "Agroecologia / Campo", nivel: "Ensino Fundamental II e Médio" },
    { nome: "Adilson", materia: "Matemática", nivel: "Ensino Fundamental II" },
    { nome: "Geovana", materia: "Língua Portuguesa", nivel: "Ensino Fundamental II" },
    { nome: "Vandre", materia: "História", nivel: "Ensino Médio" },
    { nome: "sidnei", materia: "Geografia", nivel: "Ensino Fundamental II" },
    { nome: "Erli", materia: "Ciências / Biologia", nivel: "Ensino Fundamental II" },
    { nome: "geovana", materia: "Inglês", nivel: "Ensino Médio" },
    { nome: "Christian", materia: "Física / Química", nivel: "Ensino Médio" },
    { nome: "Roberto", materia: "Educação Física", nivel: "Ensino Fundamental II" },
    { nome: "Rodrigo Xavier", materia: "Agroecologia / Campo", nivel: "Ensino Médio" },
    { nome: "Paula", materia: "Matemática", nivel: "Ensino Médio" }
];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializa os ícones Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Menu Mobile
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

    // 3. Renderização e Filtro do Corpo Docente (Professores)
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
            const card = document.createElement('div');
            card.className = "bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition flex items-start gap-4";
            card.innerHTML = `
                <div class="w-12 h-12 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0 font-bold text-lg">
                    ${prof.nome.charAt(0)}
                </div>
                <div>
                    <h4 class="font-bold text-slate-900 leading-snug">${prof.nome}</h4>
                    <span class="inline-block bg-brand-blue text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full mt-1 mb-1">
                        ${prof.materia}
                    </span>
                    <p class="text-xs text-slate-500">${prof.nivel}</p>
                </div>
            `;
            teachersGrid.appendChild(card);
        });
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

    // 4. Gerador de Prompts IA
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
                : 'o conteúdo da aula';

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
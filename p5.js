document.addEventListener('DOMContentLoaded', () => {

    // Inicializa os Ícones Lucide
    if (window.lucide) {
        lucide.createIcons();
    }

    // --- Menu Mobile ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Gerador de Prompts de IA da Escola ---
    const btnGenerate = document.getElementById('btn-generate');
    const btnCopy = document.getElementById('btn-copy');
    const resultBox = document.getElementById('result-box');
    const generatedPromptText = document.getElementById('generated-prompt-text');

    function generatePrompt() {
        const userRole = document.getElementById('user-role').value;
        const promptGoal = document.getElementById('prompt-goal').value;
        const topicInput = document.getElementById('topic-input').value.trim();
        
        const topic = topicInput !== "" ? topicInput : 'o conteúdo das aulas';

        // Prompt detalhado com informações reais da escola (480 alunos, contatos, local)
        const promptTemplate = `Você é um assistente educacional especializado. Atue como tutor pedagógico para um ${userRole} do Colégio Estadual do Campo Irmã Ambrósia Sabatovich.

Informações de Contexto da Escola:
- Localização: Colônia Marcelino, São José dos Pinhais - PR.
- Modalidade: Educação do Campo (Rede Estadual SEED-PR).
- Comunidade: 480 alunos matriculados nos níveis de Ensino Fundamental II e Ensino Médio.
- Contato oficial: sjp.ambrosia.sabatovich@escola.pr.gov.br | Tel: (41) 98320-153.

Objetivo da Solicitação: ${promptGoal}.
Tópico/Matéria: ${topic}.

Por favor, forneça uma resposta clara, pedagógica e motivadora, levando em consideração o contexto da Educação do Campo quando relevante. Organize as informações em tópicos curtos e de fácil compreensão.`;

        generatedPromptText.innerText = promptTemplate;
        resultBox.classList.remove('hidden');
    }

    function copyPrompt() {
        const textToCopy = generatedPromptText.innerText;

        navigator.clipboard.writeText(textToCopy).then(() => {
            const copyTextSpan = document.getElementById('copy-text');
            copyTextSpan.innerText = 'Copiado!';

            setTimeout(() => {
                copyTextSpan.innerText = 'Copiar';
            }, 2000);
        }).catch(err => {
            console.error('Erro ao copiar o texto: ', err);
        });
    }

    if (btnGenerate) {
        btnGenerate.addEventListener('click', generatePrompt);
    }

    if (btnCopy) {
        btnCopy.addEventListener('click', copyPrompt);
    }
});
// Aguarda o carregamento do DOM antes de rodar os scripts
document.addEventListener('DOMContentLoaded', () => {

    // Inicializa os Ícones do Lucide
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

    // --- Gerador de Prompts de IA ---
    const btnGenerate = document.getElementById('btn-generate');
    const btnCopy = document.getElementById('btn-copy');
    const resultBox = document.getElementById('result-box');
    const generatedPromptText = document.getElementById('generated-prompt-text');

    // Função para Gerar o Prompt
    function generatePrompt() {
        const userRole = document.getElementById('user-role').value;
        const promptGoal = document.getElementById('prompt-goal').value;
        const topicInput = document.getElementById('topic-input').value.trim();
        
        const topic = topicInput !== "" ? topicInput : 'o conteúdo das aulas';

        // Monta o texto do prompt com as informações institucionais da escola
        const promptTemplate = `Você é um assistente educacional especializado. Atue como tutor para um ${userRole} do Colégio Estadual do Campo Irmã Ambrósia Sabatovich (localizado na Colônia Marcelino, São José dos Pinhais - PR).

Objetivo: ${promptGoal}.
Tópico/Matéria: ${topic}.

Por favor, forneça uma resposta clara, didática e motivadora, levando em consideração o contexto da Educação do Campo quando relevante. Organize as informações em tópicos curtos e de fácil compreensão.`;

        // Exibe o texto e a caixa de resultado
        generatedPromptText.innerText = promptTemplate;
        resultBox.classList.remove('hidden');
    }

    // Função para Copiar para a Área de Transferência
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

    // Event Listeners dos botões
    if (btnGenerate) {
        btnGenerate.addEventListener('click', generatePrompt);
    }

    if (btnCopy) {
        btnCopy.addEventListener('click', copyPrompt);
    }
});
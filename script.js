// Aguarda o HTML ser completamente carregado antes de iniciar a lógica
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. MENU MOBILE (Navegação Responsiva)
    // ==========================================================================
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    // Abre e fecha o menu ao clicar no ícone de hambúrguer
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('is-active');
    });

    // Fecha o menu automaticamente quando um link é clicado
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('is-active');
        });
    });

    // ==========================================================================
    // 2. SIMULADOR AGROTECH (Cálculo de Impacto)
    // ==========================================================================
    const btnCalcular = document.getElementById('btnCalcular');
    const inputHectares = document.getElementById('hectares');
    const divResultado = document.getElementById('resultado');
    const spanValorAgua = document.getElementById('valorAgua');
    const spanValorCarbono = document.getElementById('valorCarbono');

    btnCalcular.addEventListener('click', () => {
        // Captura e converte a entrada do usuário
        const hectares = parseFloat(inputHectares.value);

        // Trava de segurança para dados inválidos
        if (isNaN(hectares) || hectares <= 0) {
            alert("Erro de Sistema: Insira um valor numérico válido e maior que zero para a área de plantio.");
            return;
        }

        // Variáveis de Cálculo (Modelagem de Dados)
        const taxaEconomiaAgua = 15400; // Litros poupados por hectare/mês (irrigação de precisão)
        const taxaReducaoCarbono = 42.5; // Kg de CO2 evitados por hectare/mês (otimização de rotas)

        // Processamento
        const economiaAguaTotal = hectares * taxaEconomiaAgua;
        const reducaoCarbonoTotal = hectares * taxaReducaoCarbono;

        // Saída de Dados com formatação PT-BR
        spanValorAgua.textContent = economiaAguaTotal.toLocaleString('pt-BR');
        spanValorCarbono.textContent = reducaoCarbonoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

        // Efeito de transição suave ao exibir o resultado
        divResultado.classList.remove('oculto');
        divResultado.style.opacity = 0;
        
        setTimeout(() => {
            divResultado.style.transition = "opacity 0.6s ease-in-out";
            divResultado.style.opacity = 1;
        }, 50);
    });

    // ==========================================================================
    // 3. QUIZ INTERATIVO (Avaliação de Conhecimento)
    // ==========================================================================
    const perguntas = [
        {
            pergunta: "Como a cinemática é aplicada na agricultura de precisão moderna?",
            respostas: [
                { texto: "Na previsão exclusiva de índices pluviométricos sazonais.", correta: false },
                { texto: "Na otimização de rotas de tratores para reduzir o tempo de operação e a queima de combustível.", correta: true },
                { texto: "No estudo de germinação de sementes em laboratórios fechados.", correta: false },
                { texto: "Na medição da velocidade do vento para colheita manual.", correta: false }
            ]
        },
        {
            pergunta: "Qual o principal impacto ambiental da robótica aliada ao mapeamento por drones?",
            respostas: [
                { texto: "Substituição completa do uso de água por compostos químicos.", correta: false },
                { texto: "Identificação precisa de pragas, aplicando defensivos apenas onde é estritamente necessário.", correta: true },
                { texto: "Aumento do tráfego de máquinas pesadas compactando o solo fértil.", correta: false },
                { texto: "Geração de imagens puramente estéticas para comercialização da safra.", correta: false }
            ]
        },
        {
            pergunta: "O que caracteriza um sistema de 'Irrigação Inteligente'?",
            respostas: [
                { texto: "Distribuição contínua de água 24 horas por dia para garantir a hidratação.", correta: false },
                { texto: "Uso de água com corantes para identificar falhas no plantio.", correta: false },
                { texto: "Utilização de dados via satélite e sensores de umidade para liberar água apenas quando a planta necessita.", correta: true },
                { texto: "Processo de alagamento controlado em grandes extensões de terra plana.", correta: false }
            ]
        }
    ];

    const elementoPergunta = document.getElementById('pergunta');
    const elementoBotoes = document.getElementById('botoes-resposta');
    const btnProximo = document.getElementById('btn-proximo');
    const divControles = document.getElementById('quiz-controles');
    const divResultadoFinal = document.getElementById('quiz-resultado-final');
    const divPerguntaContainer = document.getElementById('quiz-pergunta-container');
    const msgFinal = document.getElementById('mensagem-final');
    const btnReiniciar = document.getElementById('btn-reiniciar');

    let indicePerguntaAtual = 0;
    let pontuacao = 0;

    function iniciarQuiz() {
        indicePerguntaAtual = 0;
        pontuacao = 0;
        divControles.classList.add('oculto');
        divResultadoFinal.classList.add('oculto');
        divPerguntaContainer.classList.remove('oculto');
        mostrarPergunta();
    }

    function mostrarPergunta() {
        resetarEstado();
        let perguntaAtual = perguntas[indicePerguntaAtual];
        elementoPergunta.innerText = perguntaAtual.pergunta;

        perguntaAtual.respostas.forEach(resposta => {
            const button = document.createElement('button');
            button.innerText = resposta.texto;
            button.classList.add('btn-resposta');
            if (resposta.correta) {
                button.dataset.correta = resposta.correta;
            }
            button.addEventListener('click', selecionarResposta);
            elementoBotoes.appendChild(button);
        });
    }

    function resetarEstado() {
        divControles.classList.add('oculto');
        while (elementoBotoes.firstChild) {
            elementoBotoes.removeChild(elementoBotoes.firstChild);
        }
    }

    function selecionarResposta(e) {
        const botaoSelecionado = e.target;
        const estaCorreta = botaoSelecionado.dataset.correta === "true";
        
        if (estaCorreta) {
            pontuacao++;
            botaoSelecionado.classList.add('correto');
        } else {
            botaoSelecionado.classList.add('errado');
        }
        
        // Revela qual era a resposta certa e desabilita os botões
        Array.from(elementoBotoes.children).forEach(button => {
            if (button.dataset.correta === "true") {
                button.classList.add('correto');
            }
            button.disabled = true;
            // Estilo para mostrar que está desabilitado
            button.style.cursor = 'not-allowed';
            button.style.opacity = '0.8';
        });
        
        divControles.classList.remove('oculto');
    }

    btnProximo.addEventListener('click', () => {
        indicePerguntaAtual++;
        if (indicePerguntaAtual < perguntas.length) {
            mostrarPergunta();
        } else {
            mostrarPontuacao();
        }
    });

    function mostrarPontuacao() {
        resetarEstado();
        divPerguntaContainer.classList.add('oculto');
        divResultadoFinal.classList.remove('oculto');
        
        // Feedback dinâmico baseado na nota
        let feedback = "";
        if(pontuacao === perguntas.length) {
            feedback = "Excelente! Você domina as inovações do agronegócio.";
        } else if (pontuacao > 0) {
            feedback = "Bom trabalho! O futuro do campo já é uma realidade para você.";
        } else {
            feedback = "Continue explorando o projeto para aprender mais sobre as tecnologias do campo!";
        }

        msgFinal.innerHTML = `Você acertou <strong>${pontuacao}</strong> de <strong>${perguntas.length}</strong> questões!<br><span style="font-size: 1.1rem; color: var(--neutral-muted); font-weight: 400; margin-top: 10px; display: block;">${feedback}</span>`;
    }

    btnReiniciar.addEventListener('click', iniciarQuiz);

    // Dispara o quiz assim que a seção é carregada
    iniciarQuiz();
});
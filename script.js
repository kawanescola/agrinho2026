// Aguarda o carregamento completo do HTML antes de rodar o script
document.addEventListener('DOMContentLoaded', () => {
    
    // Mapeamento dos elementos da interface
    const btnCalcular = document.getElementById('btnCalcular');
    const inputHectares = document.getElementById('hectares');
    const divResultado = document.getElementById('resultado');
    const spanValorAgua = document.getElementById('valorAgua');
    const spanValorCarbono = document.getElementById('valorCarbono');

    // Escuta o evento de clique no botão "Executar Simulação"
    btnCalcular.addEventListener('click', () => {
        
        // Captura e converte a entrada do usuário
        const hectares = parseFloat(inputHectares.value);

        // Trava de segurança: impede cálculos com dados inválidos
        if (isNaN(hectares) || hectares <= 0) {
            alert("Atenção: Insira um valor numérico maior que zero para a área de plantio.");
            return;
        }

        // ==========================================
        // VARIÁVEIS DE CÁLCULO E MODELAGEM DE DADOS
        // ==========================================
        
        // Economia média de água com sistemas de irrigação inteligente e sensores de umidade (Litros por hectare/mês)
        const taxaEconomiaAgua = 15400; 
        
        // Redução de CO2 baseada na otimização de rotas (cinemática do maquinário) e redução de diesel (Kg por hectare/mês)
        const taxaReducaoCarbono = 42.5; 

        // ==========================================
        // PROCESSAMENTO
        // ==========================================
        const economiaAguaTotal = hectares * taxaEconomiaAgua;
        const reducaoCarbonoTotal = hectares * taxaReducaoCarbono;

        // ==========================================
        // SAÍDA DE DADOS (DOM Manipulation)
        // ==========================================
        
        // Formata os números para o padrão brasileiro (ex: 15.400)
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
});
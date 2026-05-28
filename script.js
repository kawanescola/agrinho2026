// Selecionando os elementos do HTML pelas suas IDs
const btnCalcular = document.getElementById('btnCalcular');
const inputHectares = document.getElementById('hectares');
const divResultado = document.getElementById('resultado');
const spanValorEconomia = document.getElementById('valorEconomia');

// Adicionando um "ouvinte de evento" para o clique do botão
btnCalcular.addEventListener('click', function() {
    
    // Pega o valor digitado e converte para número
    const hectares = parseFloat(inputHectares.value);

    // Validação: verifica se o usuário digitou um número válido
    if (isNaN(hectares) || hectares <= 0) {
        alert("Por favor, insira um número válido de hectares.");
        return; 
    }

    // Lógica do negócio: Simulação de economia de 15.000 litros por hectare/mês
    const economiaPorHectare = 15000; 
    const economiaTotal = hectares * economiaPorHectare;

    // Formata o número para o padrão brasileiro (ex: 1.500.000)
    const economiaFormatada = economiaTotal.toLocaleString('pt-BR');

    // Injeta o valor calculado no HTML
    spanValorEconomia.textContent = economiaFormatada;

    // Remove a classe 'oculto' para mostrar a div de resultado
    divResultado.classList.remove('oculto');
});
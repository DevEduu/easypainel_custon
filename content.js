// Função para remover o elemento desejado
function removerAlerta() {
    const alertElement = document.querySelector('div[data-status="warning"]');
    const blueRemove = document.querySelectorAll('tbody[style*="filter: blur(4px)"]').forEach(element => {
        // Remove o estilo blur do elemento
        element.style.filter = '';
    });
    
    // Remove blur dos elementos canvas
    const canvasBlurRemove = document.querySelectorAll('canvas[style*="filter: blur(4px)"]').forEach(element => {
        // Substitui o blur por 0px para manter a estrutura do filtro mas sem efeito
        element.style.filter = 'blur(0px)';
    });
    
    const botaoUpdate = document.querySelector('button.chakra-button.css-1mk4yg'); // Seletor do botão

    
    if (alertElement) {
      alertElement.remove(); // Remove o elemento do DOM
      console.log("Elemento de alerta removido com sucesso!");
    }
    
}
  
// Observador para monitorar mudanças no DOM
const observer01 = new MutationObserver(() => {
    removerAlerta(); // Tenta remover o elemento sempre que o DOM for alterado
});
  
// Configurações do observador
observer01.observe(document.body, { childList: true, subtree: true });
  
// Tenta remover o elemento imediatamente caso já esteja presente
document.addEventListener("DOMContentLoaded", () => {
    removerAlerta();
});


///Remove Logo

// Função para substituir logos
function substituirLogos() {
    const logoImages = document.querySelectorAll('img[src="/logomark.svg"]');
    logoImages.forEach(img => {
        img.src = chrome.runtime.getURL('receba.svg');
    });
}

// Função para remover blur de todos os elementos relevantes
function removerBlur() {
    // Remove blur de tabelas
    document.querySelectorAll('tbody[style*="filter: blur(4px)"]').forEach(element => {
        element.style.filter = '';
    });
    
    // Remove blur de canvas (como mostrado na imagem)
    document.querySelectorAll('canvas[style*="filter: blur"]').forEach(element => {
        element.style.filter = 'blur(0px)';
    });
    
    // Remove blur de qualquer elemento com estilo inline contendo blur
    document.querySelectorAll('[style*="filter: blur"]').forEach(element => {
        // Verifica se é um canvas ou outro elemento que precisa ter o blur removido
        if (element.tagName.toLowerCase() === 'canvas') {
            element.style.filter = 'blur(0px)';
        }
    });
}

// Função combinada para todas as ações
function executarAcoes() {
    removerAlerta();
    substituirLogos();
    removerBlur();
}

// Configuração do Observer (APENAS UM)
const observer02 = new MutationObserver(executarAcoes);

// Inicia a observação
observer02.observe(document.body, { 
    childList: true, 
    subtree: true 
});

// Executa imediatamente ao carregar
document.addEventListener("DOMContentLoaded", executarAcoes);

// Cria uma tag <style> com as novas regras
const style = document.createElement('style');
style.textContent = `
    .texto-vermelho {
        color: #ff0000 !important;
    }
    .texto-grande {
        font-size: 20px !important;
    }
    /* Regra CSS para remover blur de elementos com classe específica */
    [class*="css-"] canvas {
        filter: blur(0px) !important;
    }
`;
document.head.appendChild(style);

// Exemplo: Aplicar a elementos com a classe "destaque"
document.querySelectorAll('chakra-button css-1utdamd').forEach(element => {
    element.classList.add('texto-vermelho', 'texto-grande');
});

// Função para zerar os pixels de uma classe específica
function zerarPixelsDaClasse(nomeClasse) {
    // Seleciona todos os elementos com a classe especificada
    const elementos = document.querySelectorAll(`.${nomeClasse}`);
    
    elementos.forEach(elemento => {
        // Zera as dimensões de largura e altura
        elemento.style.width = '0px';
        elemento.style.height = '0px';
        
        // Opcionalmente, pode adicionar outras propriedades para "zerar"
        elemento.style.opacity = '0';
        elemento.style.visibility = 'hidden';
        elemento.style.display = 'none';
    });
}

// Executa a remoção de blur periodicamente para garantir que novos elementos também sejam tratados
setInterval(removerBlur, 2000);


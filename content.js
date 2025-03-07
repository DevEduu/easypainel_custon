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

function removerButton() {
    const button = document.querySelector('.bg-emerald-600');
    if (button) {
        button.remove();
    }
}

// Função para adicionar tags de identificação aos elementos
function adicionarTags() {
    // Adiciona data-attributes para melhor identificação dos elementos
    document.querySelectorAll('.chakra-button').forEach((button, index) => {
        button.setAttribute('data-easypainel-id', `button-${index}`);
        button.setAttribute('data-easypainel-type', 'button');
        
        // Adiciona tooltip para mostrar informações sobre o elemento
        button.title = `Botão #${index}: ${button.textContent || button.getAttribute('aria-label') || 'Sem texto'}`;
        
        // Adiciona uma borda sutil para identificação visual (opcional)
        button.style.outline = '1px solid rgba(0, 255, 0, 0.2)';
    });
    
    // Adiciona identificação para os ícones
    document.querySelectorAll('.chakra-icon').forEach((icon, index) => {
        icon.setAttribute('data-easypainel-id', `icon-${index}`);
        icon.setAttribute('data-easypainel-type', 'icon');
    });
    
    // Adiciona identificação para os containers
    document.querySelectorAll('[class*="css-"]').forEach((element, index) => {
        if (!element.hasAttribute('data-easypainel-id')) {
            element.setAttribute('data-easypainel-id', `element-${index}`);
            element.setAttribute('data-easypainel-class', element.className);
        }
    });
}

// Função para adicionar novo elemento à tela
function adicionarNovoElemento() {
    // Verifica se o elemento já existe para evitar duplicação
    if (document.querySelector('#easypainel-custom-element')) {
        return;
    }
    
    // Cria o container principal
    const container = document.createElement('div');
    container.id = 'easypainel-custom-element';
    container.className = 'border-b-2 border-sidebar-border css-1m48p5d';
    container.style.padding = '10px';
    container.style.margin = '10px 0';
    container.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    container.style.borderRadius = '5px';
    
    // Cria o botão principal
    const mainButton = document.createElement('a');
    mainButton.href = '#';
    mainButton.className = 'chakra-button css-1utdamd';
    mainButton.textContent = 'EasyPainel';
    mainButton.setAttribute('data-easypainel-id', 'custom-main-button');
    
    // Cria botões de ação
    const actionButtons = [
        { label: 'Remover Blur', icon: 'M10 12a2 2 0 100-4 2 2 0 000 4z', action: removerBlur },
        { label: 'Identificar Elementos', icon: 'M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2', action: adicionarTags },
        { label: 'Limpar Console', icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16', action: () => console.clear() }
    ];
    
    // Adiciona o botão principal ao container
    container.appendChild(mainButton);
    
    // Adiciona os botões de ação
    actionButtons.forEach((btnConfig, index) => {
        const button = document.createElement('a');
        button.href = '#';
        button.className = 'chakra-button css-d6eevf';
        button.setAttribute('aria-label', btnConfig.label);
        button.setAttribute('data-easypainel-id', `custom-action-${index}`);
        button.title = btnConfig.label;
        
        // Cria o ícone SVG
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('fill', 'currentColor');
        svg.setAttribute('stroke-width', '0');
        svg.setAttribute('viewBox', '0 0 20 20');
        svg.setAttribute('aria-hidden', 'true');
        svg.setAttribute('focusable', 'false');
        svg.setAttribute('class', 'chakra-icon css-u43od');
        svg.setAttribute('height', '1em');
        svg.setAttribute('width', '1em');
        
        // Cria o path do ícone
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', btnConfig.icon);
        path.setAttribute('fill-rule', 'evenodd');
        path.setAttribute('clip-rule', 'evenodd');
        
        // Adiciona o path ao SVG
        svg.appendChild(path);
        
        // Adiciona o SVG ao botão
        button.appendChild(svg);
        
        // Adiciona o evento de clique
        button.addEventListener('click', (e) => {
            e.preventDefault();
            btnConfig.action();
        });
        
        // Adiciona o botão ao container
        container.appendChild(button);
    });
    
    // Encontra um local adequado para inserir o novo elemento
    const targetLocation = document.querySelector('.border-b-2.border-sidebar-border');
    if (targetLocation) {
        // Insere após o elemento alvo
        targetLocation.parentNode.insertBefore(container, targetLocation.nextSibling);
    } else {
        // Fallback: adiciona ao corpo do documento
        document.body.appendChild(container);
    }
}

// Função combinada para todas as ações
function executarAcoes() {
    removerAlerta();
    substituirLogos();
    removerBlur();
    removerButton();
    adicionarTags();
    adicionarNovoElemento();
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
    
    /* Estilos para os elementos personalizados */
    #easypainel-custom-element {
        transition: all 0.3s ease;
    }
    
    #easypainel-custom-element:hover {
        background-color: rgba(0, 0, 0, 0.2);
    }
    
    #easypainel-custom-element a.chakra-button {
        transition: transform 0.2s ease;
    }
    
    #easypainel-custom-element a.chakra-button:hover {
        transform: scale(1.05);
    }
    
    /* Estilo para elementos com tags de identificação */
    [data-easypainel-id]:hover::after {
        content: attr(data-easypainel-id);
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 2px 6px;
        border-radius: 3px;
        font-size: 10px;
        white-space: nowrap;
        z-index: 9999;
        pointer-events: none;
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

// Executa a adição de tags periodicamente para garantir que novos elementos também sejam identificados
setInterval(adicionarTags, 5000);


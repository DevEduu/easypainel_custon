// Função segura para remover elementos do DOM
function removerElementoComSeguranca(elemento) {
    if (!elemento) return false;
    
    try {
        // Método 1: Usando parentNode.removeChild (mais compatível)
        if (elemento.parentNode) {
            elemento.parentNode.removeChild(elemento);
            return true;
        }
        
        // Método 2: Usando remove() (mais moderno)
        try {
            elemento.remove();
            return true;
        } catch (err) {
            console.error('EasyPainel: Erro ao usar método remove():', err);
        }
        
        // Método 3: Esconder o elemento se não puder removê-lo
        try {
            elemento.style.display = 'none';
            elemento.style.visibility = 'hidden';
            elemento.style.opacity = '0';
            elemento.style.position = 'absolute';
            elemento.style.pointerEvents = 'none';
            return true;
        } catch (err) {
            console.error('EasyPainel: Erro ao esconder elemento:', err);
        }
        
        return false;
    } catch (err) {
        console.error('EasyPainel: Erro ao remover elemento:', err);
        return false;
    }
}

// Função para remover o elemento desejado
function removerAlerta() {
    try {
        const alertElement = document.querySelector('div[data-status="warning"]');
        
        // Remove blur de tabelas
        document.querySelectorAll('tbody[style*="filter: blur(4px)"]').forEach(element => {
            try {
                // Remove o estilo blur do elemento
                element.style.filter = '';
            } catch (err) {
                console.error('EasyPainel: Erro ao remover blur de tabela:', err);
            }
        });
        
        // Remove blur dos elementos canvas
        document.querySelectorAll('canvas[style*="filter: blur(4px)"]').forEach(element => {
            try {
                // Substitui o blur por 0px para manter a estrutura do filtro mas sem efeito
                element.style.filter = 'blur(0px)';
            } catch (err) {
                console.error('EasyPainel: Erro ao remover blur de canvas:', err);
            }
        });
        
        const botaoUpdate = document.querySelector('button.chakra-button.css-1mk4yg'); // Seletor do botão
        
        if (alertElement) {
            const removido = removerElementoComSeguranca(alertElement);
            if (removido) {
                console.log("EasyPainel: Elemento de alerta removido com sucesso!");
            }
        }
    } catch (error) {
        console.error('EasyPainel: Erro ao remover alerta:', error);
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
    try {
        const button = document.querySelector('.bg-emerald-600');
        if (button) {
            const removido = removerElementoComSeguranca(button);
            if (removido) {
                console.log('EasyPainel: Botão removido com sucesso');
            }
        }
    } catch (error) {
        console.error('EasyPainel: Erro ao remover botão:', error);
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
    const existingElement = document.querySelector('#easypainel-custom-element');
    if (existingElement) {
        // Se já existe, não cria novamente
        return;
    }
    
    try {
        // Cria o container principal
        const container = document.createElement('div');
        container.id = 'easypainel-custom-element';
        container.className = 'border-b-2 border-sidebar-border css-1m48p5d';
        container.style.padding = '10px';
        container.style.margin = '10px 0';
        container.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        container.style.borderRadius = '0px';
        
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
        
        // Método 1: Tenta inserir após um elemento existente
        try {
            const targetLocation = document.querySelector('.border-b-2.border-sidebar-border');
            if (targetLocation && targetLocation.parentNode) {
                targetLocation.parentNode.insertBefore(container, targetLocation.nextSibling);
                console.log('EasyPainel: Elemento personalizado adicionado com sucesso');
                return;
            }
        } catch (err) {
            console.error('EasyPainel: Erro ao inserir após elemento existente:', err);
        }
        
        // Método 2: Tenta inserir no início do body
        try {
            if (document.body.firstChild) {
                document.body.insertBefore(container, document.body.firstChild);
                console.log('EasyPainel: Elemento personalizado adicionado no início do body');
                return;
            }
        } catch (err) {
            console.error('EasyPainel: Erro ao inserir no início do body:', err);
        }
        
        // Método 3: Último recurso - append ao body
        try {
            document.body.appendChild(container);
            console.log('EasyPainel: Elemento personalizado adicionado ao final do body');
        } catch (err) {
            console.error('EasyPainel: Erro ao adicionar ao final do body:', err);
        }
    } catch (error) {
        console.error('EasyPainel: Erro ao criar elemento personalizado:', error);
    }
}

// Função combinada para todas as ações
function executarAcoes() {
    // Evita execuções simultâneas
    if (window.executandoAcoes) {
        console.log('EasyPainel: Já existe uma execução em andamento, ignorando...');
        return;
    }
    
    window.executandoAcoes = true;
    
    try {
        console.log('EasyPainel: Executando ações...');
        
        // Executa cada ação em uma Promise separada para evitar bloqueios
        Promise.resolve()
            .then(() => {
                try { removerAlerta(); } 
                catch (e) { console.error('EasyPainel: Erro ao remover alerta:', e); }
                return new Promise(resolve => setTimeout(resolve, 50)); // Pequeno atraso entre ações
            })
            .then(() => {
                try { substituirLogos(); } 
                catch (e) { console.error('EasyPainel: Erro ao substituir logos:', e); }
                return new Promise(resolve => setTimeout(resolve, 50));
            })
            .then(() => {
                try { removerBlur(); } 
                catch (e) { console.error('EasyPainel: Erro ao remover blur:', e); }
                return new Promise(resolve => setTimeout(resolve, 50));
            })
            .then(() => {
                try { removerButton(); } 
                catch (e) { console.error('EasyPainel: Erro ao remover botão:', e); }
                return new Promise(resolve => setTimeout(resolve, 50));
            })
            .then(() => {
                try { adicionarTags(); } 
                catch (e) { console.error('EasyPainel: Erro ao adicionar tags:', e); }
                return new Promise(resolve => setTimeout(resolve, 50));
            })
            .then(() => {
                try { adicionarNovoElemento(); } 
                catch (e) { console.error('EasyPainel: Erro ao adicionar novo elemento:', e); }
            })
            .finally(() => {
                console.log('EasyPainel: Todas as ações foram executadas');
                window.executandoAcoes = false;
            });
    } catch (error) {
        console.error('EasyPainel: Erro geral ao executar ações:', error);
        window.executandoAcoes = false;
    }
}

// Desconecta observadores anteriores se existirem
if (window.observer01) {
    try {
        window.observer01.disconnect();
        console.log('EasyPainel: Observer01 anterior desconectado');
    } catch (e) {
        console.error('EasyPainel: Erro ao desconectar observer01:', e);
    }
}

if (window.observer02) {
    try {
        window.observer02.disconnect();
        console.log('EasyPainel: Observer02 anterior desconectado');
    } catch (e) {
        console.error('EasyPainel: Erro ao desconectar observer02:', e);
    }
}

// Configuração do Observer (APENAS UM)
window.observer02 = new MutationObserver((mutations) => {
    // Evita processamento excessivo
    if (window.easyPainelTimeout) {
        clearTimeout(window.easyPainelTimeout);
    }
    
    window.easyPainelTimeout = setTimeout(() => {
        // Verifica se alguma das mutações é relevante para nós
        const relevantMutation = mutations.some(mutation => {
            // Verifica se é uma adição de nós
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Verifica se algum dos nós adicionados é relevante
                return Array.from(mutation.addedNodes).some(node => {
                    // Verifica se é um elemento DOM
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Verifica se tem alguma classe que nos interessa
                        const element = node;
                        return (
                            element.classList && (
                                element.classList.contains('chakra-button') ||
                                element.classList.contains('bg-emerald-600') ||
                                element.querySelector('canvas[style*="filter: blur"]') ||
                                element.querySelector('tbody[style*="filter: blur"]') ||
                                element.querySelector('div[data-status="warning"]')
                            )
                        );
                    }
                    return false;
                });
            }
            return false;
        });

        // Se houver mutações relevantes, executa as ações
        if (relevantMutation) {
            executarAcoes();
        }
    }, 500); // Aguarda 500ms para executar (debounce mais longo)
});

// Inicia a observação com configurações mais específicas
try {
    window.observer02.observe(document.body, { 
        childList: true, 
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class', 'data-status']
    });
    console.log('EasyPainel: Observer iniciado com sucesso');
} catch (e) {
    console.error('EasyPainel: Erro ao iniciar observer:', e);
}

// Executa imediatamente ao carregar
document.addEventListener("DOMContentLoaded", () => {
    console.log('EasyPainel: DOM carregado, executando ações iniciais...');
    // Pequeno atraso para garantir que o DOM esteja completamente carregado
    setTimeout(executarAcoes, 1000);
});

// Executa novamente após o carregamento completo da página
window.addEventListener("load", () => {
    console.log('EasyPainel: Página totalmente carregada, executando ações novamente...');
    // Pequeno atraso para garantir que todos os recursos estejam carregados
    setTimeout(executarAcoes, 2000);
});

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


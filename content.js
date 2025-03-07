// Função segura para manipular estilos de elementos
function aplicarEstiloComSeguranca(elemento, propriedade, valor) {
    if (!elemento) return false;
    
    try {
        elemento.style[propriedade] = valor;
        return true;
    } catch (err) {
        console.error('EasyPainel: Erro ao aplicar estilo:', err);
        return false;
    }
}

// Função para remover o elemento desejado
function removerAlerta() {
    try {
        const alertElement = document.querySelector('div[data-status="warning"]');
        
        if (alertElement) {
            try {
                if (alertElement.parentNode) {
                    alertElement.parentNode.removeChild(alertElement);
                } else {
                    alertElement.remove();
                }
                console.log("EasyPainel: Elemento de alerta removido com sucesso!");
            } catch (err) {
                console.error('EasyPainel: Erro ao remover alerta:', err);
                // Tenta esconder o elemento se não puder removê-lo
                try {
                    alertElement.style.display = 'none';
                    alertElement.style.visibility = 'hidden';
                } catch (e) {
                    console.error('EasyPainel: Erro ao esconder alerta:', e);
                }
            }
        }
    } catch (error) {
        console.error('EasyPainel: Erro ao processar alerta:', error);
    }
}

// Função para substituir logos
function substituirLogos() {
    try {
        const logoImages = document.querySelectorAll('img[src="/logomark.svg"]');
        logoImages.forEach(img => {
            try {
                img.src = chrome.runtime.getURL('receba.svg');
                console.log('EasyPainel: Logo substituído com sucesso');
            } catch (err) {
                console.error('EasyPainel: Erro ao substituir logo:', err);
            }
        });
    } catch (error) {
        console.error('EasyPainel: Erro ao processar logos:', error);
    }
}

// Função para remover blur de todos os elementos relevantes
function removerBlur() {
    try {
        // Remove blur de tabelas
        document.querySelectorAll('tbody[style*="filter: blur"]').forEach(element => {
            try {
                aplicarEstiloComSeguranca(element, 'filter', '');
            } catch (err) {
                console.error('EasyPainel: Erro ao remover blur de tabela:', err);
            }
        });
        
        // Remove blur de canvas
        document.querySelectorAll('canvas[style*="filter: blur"]').forEach(element => {
            try {
                aplicarEstiloComSeguranca(element, 'filter', 'blur(0px)');
            } catch (err) {
                console.error('EasyPainel: Erro ao remover blur de canvas:', err);
            }
        });
        
        // Remove blur de qualquer elemento com estilo inline contendo blur
        document.querySelectorAll('[style*="filter: blur"]').forEach(element => {
            try {
                // Verifica se é um canvas ou outro elemento
                if (element.tagName.toLowerCase() === 'canvas') {
                    aplicarEstiloComSeguranca(element, 'filter', 'blur(0px)');
                } else {
                    aplicarEstiloComSeguranca(element, 'filter', '');
                }
            } catch (err) {
                console.error('EasyPainel: Erro ao remover blur de elemento:', err);
            }
        });
        
        console.log('EasyPainel: Blur removido com sucesso');
    } catch (error) {
        console.error('EasyPainel: Erro ao remover blur:', error);
    }
}

// Função combinada para todas as ações
function executarAcoes() {
    // Evita execuções simultâneas
    if (window.executandoAcoes) {
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
                return new Promise(resolve => setTimeout(resolve, 50));
            })
            .then(() => {
                try { substituirLogos(); } 
                catch (e) { console.error('EasyPainel: Erro ao substituir logos:', e); }
                return new Promise(resolve => setTimeout(resolve, 50));
            })
            .then(() => {
                try { removerBlur(); } 
                catch (e) { console.error('EasyPainel: Erro ao remover blur:', e); }
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
if (window.observer) {
    try {
        window.observer.disconnect();
        console.log('EasyPainel: Observer anterior desconectado');
    } catch (e) {
        console.error('EasyPainel: Erro ao desconectar observer:', e);
    }
}

// Configuração do Observer
window.observer = new MutationObserver((mutations) => {
    // Evita processamento excessivo
    if (window.easyPainelTimeout) {
        clearTimeout(window.easyPainelTimeout);
    }
    
    window.easyPainelTimeout = setTimeout(() => {
        // Verifica se alguma das mutações é relevante para nós
        const relevantMutation = mutations.some(mutation => {
            // Verifica se é uma adição de nós ou mudança de atributos
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                return Array.from(mutation.addedNodes).some(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const element = node;
                        return (
                            element.querySelector('canvas[style*="filter: blur"]') ||
                            element.querySelector('tbody[style*="filter: blur"]') ||
                            element.querySelector('div[data-status="warning"]') ||
                            element.querySelector('img[src="/logomark.svg"]')
                        );
                    }
                    return false;
                });
            } else if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                const element = mutation.target;
                return element.style.filter && element.style.filter.includes('blur');
            }
            return false;
        });

        // Se houver mutações relevantes, executa as ações
        if (relevantMutation) {
            executarAcoes();
        }
    }, 300);
});

// Inicia a observação com configurações específicas
try {
    window.observer.observe(document.body, { 
        childList: true, 
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'src', 'data-status']
    });
    console.log('EasyPainel: Observer iniciado com sucesso');
} catch (e) {
    console.error('EasyPainel: Erro ao iniciar observer:', e);
}

// Cria uma tag <style> com as regras CSS para remover blur
const style = document.createElement('style');
style.textContent = `
    /* Regra CSS para remover blur de elementos com classe específica */
    [class*="css-"] canvas {
        filter: blur(0px) !important;
    }
    
    /* Remove blur de elementos com estilo inline */
    [style*="filter: blur"] {
        filter: none !important;
    }
    
    /* Garante que canvas não tenha blur */
    canvas {
        filter: blur(0px) !important;
    }
`;
document.head.appendChild(style);

// Executa imediatamente ao carregar
document.addEventListener("DOMContentLoaded", () => {
    console.log('EasyPainel: DOM carregado, executando ações iniciais...');
    setTimeout(executarAcoes, 500);
});

// Executa novamente após o carregamento completo da página
window.addEventListener("load", () => {
    console.log('EasyPainel: Página totalmente carregada, executando ações novamente...');
    setTimeout(executarAcoes, 1000);
});

// Executa a remoção de blur periodicamente para garantir que novos elementos também sejam tratados
setInterval(removerBlur, 2000);


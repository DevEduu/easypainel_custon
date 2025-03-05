// Função para remover o elemento desejado
function removerAlerta() {
    const alertElement = document.querySelector('div[data-status="warning"]');
    const blueRemove = document.querySelectorAll('tbody[style*="filter: blur(4px)"]').forEach(element => {
        // Remove o estilo blur do elemento
        element.style.filter = '';
    });
    const botaoUpdate = document.querySelector('button.chakra-button.css-1mk4yg'); // Seletor do botão

    
    if (alertElement) {
      alertElement.remove(); // Remove o elemento do DOM
      console.log("Elemento de alerta removido com sucesso!");
    }
    
  }
  
  // Observador para monitorar mudanças no DOM
  const observer = new MutationObserver(() => {
    removerAlerta(); // Tenta remover o elemento sempre que o DOM for alterado
  });
  
  // Configurações do observador
  observer.observe(document.body, { childList: true, subtree: true });
  
  // Tenta remover o elemento imediatamente caso já esteja presente
  document.addEventListener("DOMContentLoaded", () => {
    removerAlerta();
  });


  ///Remove Logo


  // Função para alterar ou adicionar o logo
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o container onde o logo será alterado ou adicionado
    const targetElement = document.querySelector('header'); // Substitua 'header' pelo seletor correto do local onde o logo será inserido

    if (targetElement) {
        // Remove logo existente (opcional)
        const existingLogo = targetElement.querySelector('img');
        if (existingLogo) {
            existingLogo.remove();
        }

        // Cria o novo logo com o HTML fornecido
        const newLogoDiv = document.createElement('div');
        newLogoDiv.className = 'size-12 box-border border shadow-sm rounded-lg p-2 bg-background shrink-0 outline outline-[3px] border-transparent outline-green-500 dark:outline-green-600';

        const newLogoImg = document.createElement('img');
        newLogoImg.alt = 'Home';
        newLogoImg.src = '/receba.svg'; // Atualize com o caminho correto para o logo na sua extensão

        // Adiciona o <img> dentro do <div>
        newLogoDiv.appendChild(newLogoImg);

        // Insere o novo logo no elemento alvo
        targetElement.appendChild(newLogoDiv);
        console.log("Logo alterado/adicionado com sucesso!");
    } else {
        console.error('Elemento de destino para adicionar o logo não foi encontrado.');
    }
});
  
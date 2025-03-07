# EasyPainel Custom

![Ícone da Extensão](icons/icon144.png)

## Descrição
EasyPainel Custom é uma extensão para o Chrome que melhora a experiência de uso do painel.receba.digital, removendo elementos indesejados, como alertas e efeitos de blur, além de personalizar a interface.

## Funcionalidades

- **Remoção de Blur**: Remove o efeito de blur de elementos canvas e tabelas, permitindo visualizar claramente todas as informações.
- **Remoção de Alertas**: Elimina automaticamente alertas indesejados da interface.
- **Substituição de Logo**: Substitui o logo padrão pelo logo personalizado "receba.svg".
- **Personalização de Estilo**: Adiciona estilos personalizados para melhorar a visualização.
- **Identificação de Elementos**: Adiciona atributos data-* aos elementos para facilitar a identificação e depuração.
- **Barra de Ferramentas Personalizada**: Adiciona uma barra com botões para funções úteis como remover blur e identificar elementos.

## Como Instalar

1. Faça o download ou clone este repositório
2. Abra o Chrome e navegue até `chrome://extensions/`
3. Ative o "Modo do desenvolvedor" no canto superior direito
4. Clique em "Carregar sem compactação" e selecione a pasta do projeto
5. A extensão será instalada e ativada automaticamente

## Como Usar

Após a instalação, simplesmente navegue até `https://painel.receba.digital/` e a extensão funcionará automaticamente:

- Os elementos com blur serão exibidos normalmente
- Alertas indesejados serão removidos
- O logo será substituído pelo personalizado
- Uma barra de ferramentas personalizada será adicionada à interface
- Passe o mouse sobre os elementos para ver seus identificadores

### Barra de Ferramentas

A barra de ferramentas personalizada inclui os seguintes botões:
- **EasyPainel**: Botão principal da extensão
- **Remover Blur**: Remove manualmente o efeito de blur de todos os elementos
- **Identificar Elementos**: Adiciona identificadores visuais a todos os elementos
- **Limpar Console**: Limpa o console do navegador

## Configuração

Não é necessária nenhuma configuração adicional. A extensão funciona automaticamente ao acessar o site.

## Desenvolvimento

### Estrutura de Arquivos
- `manifest.json`: Configuração da extensão
- `content.js`: Script principal que executa as modificações na página
- `receba.svg`: Logo personalizado
- `icons/`: Pasta contendo os ícones da extensão
- `README.md`: Documentação da extensão

### Funções Principais
- `removerAlerta()`: Remove alertas indesejados
- `removerBlur()`: Remove efeitos de blur
- `substituirLogos()`: Substitui logos
- `adicionarTags()`: Adiciona identificadores aos elementos
- `adicionarNovoElemento()`: Adiciona a barra de ferramentas personalizada
- `executarAcoes()`: Função principal que executa todas as ações

### Contribuição
Para contribuir com o projeto:
1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Faça push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## Licença
Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.

## Contato
Para sugestões ou problemas, abra uma issue no repositório do projeto. 
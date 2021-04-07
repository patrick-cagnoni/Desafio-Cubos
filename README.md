# Desafio Cubos (Busca filmes)

## Regras

[Regras deste desafio](https://git.cubos.io/cubos/desafio-tecnico-web)

## Live Demo

O App está rodando no endereço: https://desafio-cubos.netlify.com

### Instalação

Após clonar o código, instale as dependências com o comando `npm install`.

### Configuração

Antes de usar é necessário configurar o API KEY para ter acesso a API do MovieDB. abra o arquivo __src/api/config.js__ e preencha o atributo API KEY. 

### Rodar o App

use o comando `npm run start` para rodar a aplicação. Endereço padrão: localhost:3000.

### Buscar filmes

Use a barra de busca para procurar filmes por nome ou gênero. A primeira palavra irá definir o tipo da busca. Se a primeira palavra for um gênero, então a busca será por gênero e as demais palavras desta pesquisas serão consideradas gêneros adicionais da busca. Caso a primeira palavra não for um gênero, a busca será por nome.

### Lista de filmes

Ao realizar uma busca, uma lista de filmes irá aparecer. Clique no nome ou na imagem do filme para ver os detalhes.



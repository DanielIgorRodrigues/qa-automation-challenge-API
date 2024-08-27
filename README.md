# Projeto de Automação de Testes de API

## Descrição

Este projeto foi desenvolvido para o Desafio Técnico de QA Automation, para automatizar os testes do endpoint "/Produtos" da aplicação https://serverest.dev/.

Os methods testados foram POST e GET.

https://serverest.dev/produtos

Para este desafio foi utilizado o [Jest](https://jestjs.io/) e [Supertest](https://github.com/visionmedia/supertest). 

## Estrutura do Projeto

A estrutura do projeto está organizada da seguinte forma:

```plaintext
/tests
  /config
    setupTests.js          # Configurações globais para os testes
  /fixtures
    messages.js            # Mensagens dos responses
    product.json           # Dados de produtos utilizados nos testes
  /helpers
    helpers.js             # Funções auxiliares
  getProdutos.spec.js       # Testes para o endpoint GET /produtos
  postProdutos.spec.js      # Testes para o endpoint POST /produtos
  ```

## Pré-requisitos

Para rodar este projeto, você precisará ter o Node.js instalado na sua máquina. Recomendo utilizar o Node.js versão 14.x ou superior.

## Instalação

1. Clone este repositório:
    ```bash
    git clone https://github.com/DanielIgorRodrigues/qa-automation-challenge-API.git
    ```

2. Instale as dependências do projeto:
    ```bash
    npm install
    ```

## Executando os Testes

Para executar todos os testes de API:

```bash
npm test
```

## Os Testes

Os testes estão divididos em dois arquivos principais:

- **`getProdutos.spec.js`:** Contém os testes para o endpoint `GET /produtos`. Esses testes verificam a listagem de produtos, a integridade dos dados retornados, e a presença de um produto recém-cadastrado.

- **`postProdutos.spec.js`:** Contém os testes para o endpoint `POST /produtos`. Esses testes cobrem a criação de produtos, validações de dados (campos obrigatórios, duplicação, etc.), e tratamento de erros.

## Funcionalidades Testadas

### GET /produtos

- Verificação do status code 200 e se a resposta contém uma lista de produtos.
- Verificação de que a quantidade de produtos corresponde ao número de itens na lista.
- Validação da estrutura dos produtos retornados.
- Verificação de que um produto recém-cadastrado está presente na lista.

### POST /produtos

- Criação de um produto com sucesso (status code 201).
- Tentativa de criar um produto duplicado (status code 400).
- Tentativa de criar um produto sem token de autenticação (status code 401).
- Tentativa de criar um produto com campos obrigatórios ausentes (status code 400).
- Verificação de inserção com dados nos limites aceitáveis e dados inválidos.

## Informações Adicionais

### Arquivo `messages.js`

Este arquivo contém mensagens reutilizáveis para as validações nos testes. As mensagens são centralizadas para garantir consistência e facilitar a manutenção.

### Arquivo `product.json`

Este arquivo contém os dados de produtos utilizados para os testes, permitindo a reutilização e fácil modificação dos dados de entrada.

### Arquivo `helpers.js`

Contém funções auxiliares como `login`, `addProduct`, `getProduct`, `deleteProductByID`, entre outras, para simplificar a execução dos testes e evitar a duplicação de código.

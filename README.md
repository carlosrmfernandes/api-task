## Backend

Seja bem vindo ao teste de backend.

### Para iniciar o banco de dados é necessario ter o docker-compose instalado em sua máquina:
- Crie um diretório na raiz do projeto chamado `data`
- Rode o seguinte comando para criar um container Docker de um DB MySQL:

```
    docker-compose up -d
```

o docker-compose vai criar um container de um MySQL e você poderá acessar via localhost:3306 e a senha do usuário **root** é **senha_root_123**

### Para instalar as dependências da aplicação, execute o comando:

```
    npm install
```

### Para configurar o banco de dados execute os comandos:
- Para injetar alterações do schema prisma dentro da biblioteca
```
    npm run generate
```

- Para criar a migratio sem executa-la
```
    npx prisma migrate dev --name {MigrationName} --create-only
```
**Substitua {MigrationName} pelo nome escolhido para sua migration**

- Para fazer a inserção das migrations não executadas:
```
    npm run migrate
```

### Para iniciar o servidor express basta executar o seguinte comando:

    npm start
    ou
    yarn start

### Documentação OpenAPI 3.0 - SWAGGER

- Após servidor iniciado, acesse `localhost:4568/api-docs` para visualizar a documentação da API.

### TESTE - JEST

- Para realizar os testes em Jest é necessário rodar o seguinte comando:
```
    npm run test
``` 
- Ainda há testes a serem criados para cobrir um número maior de casos de uso.

### Exemplo de Requisição
- Faça uma requisição POST HTTP para ```localhost:4568/v1/user``` contendo um body no formato JSON conforme o exemplo:
```
    {
        "title": "Test",
        "description": "Test",
        "completion_date": "2024-05-26",
        "priority": "ALTA"      
    }
```

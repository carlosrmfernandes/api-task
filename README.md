# APi
### DOCUMENTAÇÃO


## Para iniciar o serviço 
Essas instruções farão com que você tenha uma cópia do projeto em execução na sua máquina local para fins de desenvolvimento e teste. Veja a implantação de notas sobre como implantar o projeto em um sistema ativo.

## Plataforma para execução do projeto

```
Docker
```
Para mais informações clique [aqui](https://docs.docker.com/) para visitar a documentação oficial do docker

## Servidores e Portas 
| Serviço | Porta  |
|--|--|
| node | 4568 |
| mysql | 3306 |

## Design de software


```
S O L I D 
```

## Framework

```
Express
```

## Pré-requisitos

```
Criar um diretório na are trabalho
Clonar o projecto dentro desse diretório
```

Executar o docker compuser
```
docker-compose up 
```

## Comandos básicos 

```
#para entrar no api
docker exec -it api sh

#Executa os seguintes comando
npm run generate

npm run migrate
```

## Banco de dados
Configura o seu banco de dados 

Acesse o container pgadmin via browser

```
task_db:3306
```

## Teste Unintário  

Acessar o container onde esta à aplicacão e dentro do diretório do projecto execute o seguinte comando para executar os testes

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

### Documentação OpenAPI 3.0 - SWAGGER

- Após servidor iniciado, acesse `localhost:4568/api-docs` para visualizar a documentação da API.

# Metric-Imperial Converter

Servidor relacionado ao desafio da freeCodeCamp org para a certificação de Quality Assurance. Mais instruções sobre o desafio podem ser encontradas no seguinte link: https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/issue-tracker

O desafio envolve em criar um aplicação fullstack para manteri issues de um projeto, utilizando express para o backend, MongoDB como banco de dados e mocha chai para fazer testes.

Uma versão live pode ser encontrada em: https://boilerplate-project-issuetracker.leonardo-kazu.repl.co

> O código foi feito em junção com o boilerplate oferecido pela freeCodeCamp para que pudessem averiguar as funcionaldiades da aplicação.

## How to's da API

A api aceita requisições `GET`, `POST`, `PUT` e `DELETE` todas para o mesmo endpoint <code>/api/issues/:projectname</code>, onde cada requisiçaõ possui um efeito diferente

### `GET`

Funciona como uma maneira de requisitar todas as issues de um projeto, retornando um array que contém todas as informações de todas as issues.

As issues seguem o seguinte padrão

```json
{
  "_id": "String",
  "issue_title": "String",
  "issue_text": "String",
  "created_on": "Date",
  "updated_on": "Date",
  "created_by": "String",
  "assigned_to": "String",
  "open": "Bollean",
  "status_text": "String"
}
```

Também pode ser aplicado filtros ao método, como queries, dessa forma retornando apenas as issues que caibam no filtro.

### `POST`

Para pode criar novas issues é feito um `POST` para o endpoint do projeto escolhido, onde o projeto é decidido pela URL, é obrigatório o envio das seguintes informações:

- issue_title
- issue_text
- created_by

Como parâmetros opcionais temos:

- assigned_to
- status_text

Existem dois tipos de respostas possíveis do servidor:

- Caso esteja faltando algum paramêtro obrigatório

```json
{
  "error": "required field(s) missing"
}
```

- Em caso de sucesso

```json
{
  "_id": "id da issue",
  "issue_title": "Titulo da issue",
  "issue_text": "Texto da issue",
  "created_on": "Data da criação",
  "updated_on": "Último update da issue",
  "created_by": "Quem criou a issue",
  "assigned_to": "Quem está assigned a issue",
  "open": "Se está aberta ou fechada",
  "status_text": "Texto da issue"
}
```

### `PUT`

Com o método `PUT` pode-se atualizar uma issue de um determinado projeto, como único parâmetro obrigatório têm-se a `_id` da issue e pelo menos um campo para atualizar. Os campos atualizáveis são:

- issue-title
- issue_text
- created_by
- status_text
- assigned_to
- open \<booleano\>

O servidor pode responder de quatro maneiras diferentes:

- No caso de faltar uma \_id:

```json
{
  "error": "missing _id"
}
```

- No caso de faltar algum parâmetro para atualizar:

```json
{
  "error": "no update field(s) sent",
  "_id": "_id enviada"
}
```

- No caso de algum erro ao fazer o update:

```json
{
  "error": "could not update",
  "_id": "_id enviada"
}
```

- Em caso de sucesso:

```json
{
  "result": "successfully updated",
  "_id": "_id enviada"
}
```

### `DELETE`

Com o método `DELETE` podemos deletar uma issue a partir do seu `_id`, sendo esse o único parâmetro necessário.

O servidor pode responder de três maneiras diferentes:

- No caso de falatr uma \_id:

```json
{
  "error": "missing _id"
}
```

- No caso de algum erro ao deletar:

```json
{
  "error": "could not delete",
  "_id": "_id enviada"
}
```

- No caso de sucesso:

```json
{
  "result": "successfully deleted",
  "_id": "_id enviada"
}
```

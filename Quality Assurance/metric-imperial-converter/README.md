# Metric-Imperial Converter

Servidor relacionado ao desafio da freeCodeCamp org para a certificação de Quality Assurance. Mais instruções sobre o desafio podem ser encontradas no seguinte link: https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/metric-imperial-converter



O desafio se envolve em criar um aplicação fullstack de conversão de unidade do sistema métrico para o imperial e vice versa, utilizando express para o backend e mocha chai para fazer testes de qualidade.



Uma versão live pode ser encontrada em: https://boilerplate-project-metricimpconverter.leonardo-kazu.repl.co



> O código foi feito em junção com o boilerplate oferecido pela freeCodeCamp para que pudessem averiguar as funcionalidades da aplicação.



## How to's da API

A api aceita apenas GET's para o seguinte endereço relativo <code>/api/convert</code>, como parâmetros aceita uma váriavel chamada de <code>input</code> onde é enviado um valor e sua undiade para conversão, as unidades aceitas são:

- l (liters)

- gal (gallons)

- km (kilometers)

- mi (miles)

- kg (kilograms)

- lbs (pounds)

Como resposta se recebe um JSON com os seguintes atributos:

```json
{
    "initNum": "Number" ,
    "initUnit": "String" ,
    "returnNum": "Number" ,
    "returnUnit": "String" ,
    "string": "String"
}
```

### Exemplo

<code>GET: ../api/convert?input=10l</code>

```json
{
    "initNum": 10,
    "initUnit": "L",
    "returnNum": 2.64172,
    "returnUnit": "gal",
    "string": "10 liters converts to 2.64172 gallons"
}
```

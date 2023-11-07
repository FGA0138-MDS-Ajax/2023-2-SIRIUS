# Visão do produto e do projeto - Matcher

## Histórico de Revisão

| Data       | Versão | Descrição                                             | Autor(es)                       |
| ---------- | ------ | ----------------------------------------------------- | ------------------------------- |
| 03/10/2023 | 0.1    | Criação do documento (apenas o esqueleto)             | Lucas Queiroz                   |
| 03/10/2023 | 0.2    | Adição de tecnologias a serem utilizadas              | Lucas Queiroz<br>Philipe Morais |
| 03/10/2023 | 0.3    | Adição de alguns dos papéis na organização do projeto | Lucas Queiroz                   |
| 03/10/2023 | 0.4    | Adição do Ciclo de vida do projeto                    | João Eduardo P.                 |
| 03/10/2023 | 0.5    | Adição de dados do produto                            | Lucas Queiroz<br>Lucas Meireles |
| 03/10/2023 | 0.6    | Atualização da Visão Geral do Projeto                 | João Pedro da Silva             |
| 03/10/2023 | 1.0    | Revisão do documento                                  | Lucas Queiroz                   |
| 05/10/2023 | 1.1    | Documento atualizado com o feedback do professor      | Lucas Queiroz                   |
| 06/11/2023 | 1.2    | Documento atualizado com o feedback do professor      | Todo o grupo                    |


## Visão Geral do Produto

### Problema

- Contexto: Administração/manutenção de competições de esportes eletrônicos.
- Problema: A realização de competições de campeonatos de Teamfight Tactics (TFT), por exemplo, ainda não possui um sistema dedicado de chaveamento e manutenção visto sua diferença de estilo de partida para 8 jogadores em uma mesma sala, dos quais um número definido pelo organizador da competição irá passar à próxima rodada da mesma.
- Solução: automatizar o processo de chaveamento e realização dos torneios.

### Declaração de Posição do Produto

| Para:          | Organizadores de torneios de e-sports           |
| -------------- | ----------------------------------------------- |
| Necessidade:   | Chavear os jogadores do torneio de TFT                 |
| O Matcher:     | é uma solução web                               |
| Que:           | Auxilia no processo de chaveamento e realização dos torneios de TFT |
| Ao contrário:  | Battlefy, Challengermode                        |
| Nosso produto: | Realiza o chaveamento de maneira automatizada   |

**OBS**: Vale ressaltar que o produto é a melhoria de uma solução já existente. Além disso, é possível que o produto seja vendido à empresa cliente ou até integrado a uma empresa maior, sendo esta a Battlefy.
Atualmente o cliente primário utiliza um chaveamento baseado em múltiplas planilhas da Google com scripts feitos à mão para acelerar e reduzir o processo manual ao máximo e evitar grandes esperas dos jogadores durante o evento da competição propriamente dita.

### Objetivos do Produto

- Automatizar o processo de chaveamento de torneios, o que inclui, mas não se limita a: chaveamento de rodadas, reconhecimento de vencedores de rodada, análise de dados cadastrados, ajuste de presença de jogadores.;
- Gerar relatórios de torneios (rodadas, jogadores, vencedores, etc);
- Reconhecer dados repetidos em torneios separados;

### Tecnologias a serem utilizadas

O principal critério para a escolha das tecnologias abaixo foi a familiaridade de alguns membros do grupo com elas. Assim, torna-se mais fácil o desenvolvimento, pois membros experientes podem ensinar os que estão aprendendo, e o número de gargalos devido ao desconhecimento técnico é reduzido. Além disso, elas são, todas, padrões de mercado, já bem testadas e consolidadas, utilizadas em vários projetos de grande escala (o facebook e o instagram, por exemplo, foram construídos utilizando React).

- Front-end: [React](https://react.dev)
- Back-end: [MySQL](https://mysql.com), [Node](https://nodejs.org), [Express](https://expressjs.com), [Prisma](https://prisma.io)
- Documentação: [MkDocs](https://https://www.mkdocs.org/)
- Conteinerização: [Docker](https://docker.com)

## Visão Geral do Projeto

### Ciclo de vida do projeto de desenvolvimento de software

- **Metodologia**: ágil. Isso garante contato contínuo com nossos clientes. Além disso, podemos receber feedback constante ao longo do processo de desenvolvimento.
- **Processo**: SCRUM/XP. Esse processo é um híbrido entre SCRUM e XP. Para as atividades e conceitos relativos ao SCRUM, vamos nos basear no "Guia do Scrum". Para as atividades e conceitos relativos ao XP, vamos nos basear no livro "Programação extrema(xp) explicada", do autor Kent Beck. 
- **Ferramentas**: utilizaremos o GitHub para gerenciar alterações e submissões de código, além do MkDocs para manter a documentação do projeto atualizada. Para reuniões, encontros e afins, utilizaremos como ferramental de apoio o [Gather Town](https://www.gather.town/) (aplicação web que promove um contexto similar a um jogo e possui ferramentas similares à um escritório online), criando um ambiente virtual mais atraente e descontraido para os membros envolvidos, além de permitir que membros possam acompanhar e interagir de modo mais casual uns com os outros.
- **Métodos**: como citado acima, utilizaremos dos métodos que vem do SCRUM/XP. Ou seja, vamos utilizar de Pair Programming, Code Review, Integração Contínua, Refatoração, Jogo do Planejamento, Sprint Daily, Sprint Planning, Sprint Review, Sprint Retrospective e Refinamento de Backlog do Produto. 


### Organização do Projeto

| Papel         | Atribuições                                                  | Responsável    | Participantes |
| ------------- | ------------------------------------------------------------ | -------------- | ------------- |
| Product Owner | Definir e organizar o Backlog do Produto;<br>Definir e organizar o Backlog da Sprint; | Lucas Meireles | Lucas Meireles |
| Desenvolvedor | Escrever os códigos da aplicação;<br>Escrever códigos de testes;<br>Documentar o código da aplicação. | Philipe Morais | Todo o grupo  |
| Analista de Qualidade | Definir padrões para a qualidade do produto;<br>Estipular o cumprimento dos tópicos definidos do produto;<br>Trabalhar na análise da consistência do código fonte do produto; | ---------------  | Todo o grupo  |
| Cliente       | Verificar se o que foi definido no escopo está sendo entregue;<br>Auxiliar o Product Owner a definir o escopo do produto; | Lucas Meireles | Lucas Meireles |
| Scrum Master | Garantir que os artefatos, rituais e princípios do Scrum sejam seguidos de acordo com o Guia do Scrum. | Lucas Queiroz | Lucas Queiroz |



### Planejamento das Fases e/ou Iterações do Projeto

| Sprint        | Produto (entrega)                                            | Data Início | Data Fim | Entregável(eis)                                              | Responsáveis | % conclusão |
| ------------- | ------------------------------------------------------------ | ----------- | -------- | ------------------------------------------------------------ | ------------ | ----------- |
| Pré-SCRUM/XP* | Definir visão e escopo (de forma generalizada) do produto e do projeto. | 02/10       | 24/10    | Documento de visão, documento de escopo, powerpoint e atas de reunião realizadas | Todo o grupo | 40%         |
| Sprint 1      | Definir a arquitetura do produto e  entregar US1             | 24/10/2023  | 31/10    | Documento de arquitetura, backlog da sprint, incremento, meta da sprint, US1 | Todo o grupo | 50%         |
| Sprint 2      | Corrigir os documentos de visão, escopo e arquitetura, e entregar a US1** | 01/11       | 07/11    | Documentos atualizados, US1, backlog da sprint, incremento, meta da sprint | Todo o grupo | 60%         |
| Sprint 3      | Entregar US2                                                 | 08/11       | 14/11    | US2, backlog da sprint, incremento, meta da sprint           | Todo o grupo | 70%         |
| Sprint 4      | Entregar US3                                                 | 15/11       | 21/11    | US3, backlog da sprint, incremento, meta da sprint           | Todo o grupo | 80%         |
| Sprint 5      | Entregar US6 e US7                                           | 22/11       | 27/11    | US6 e US7, backlog da sprint, incremento, meta da sprint     | Todo o grupo | 90%         |
| Sprint 6      | Entregar US8 e US9                                           | 29/11       | 04/11    | US8 e US9, backlog da sprint, incremento, meta da sprint     | Todo o grupo | 100%        |

*: não é sprint devidamente, pois nesse momento ainda não começamos a utilizar da metodologia SCRUM, muito menos dos rituais, artefatos, pilares, etc.

**: não conseguimos entregar, de fato, a US1 na sprint 1.

### Matriz de Comunicação




| Descrição            | Área/Envolvidos | Periodicidade            | Produtos Gerados            |
| -------------------- | --------------- | ------------------------ | --------------------------- |
| Sprint planning      | Todo o grupo    | No início de cada sprint | Backlog da sprint           |
| Daily Scrum          | Todo o grupo    | Diário                   | Ata de reunião              |
| Sprint Review        | Todo o grupo    | Ao final de cada sprint  | Ata de sprint review        |
| Sprint Retrospective | Todo o grupo    | Ao final de cada sprint  | Ata de sprint retrospective |



### Gerenciamento de Riscos

###   

| Riscos | Grau de exposição | Mitigação | Plano de Contigência |
| -------------- | --------------- | ------------- | ---------------- |
| Trancamento de matrícula por parte de algum membro | Baixo (o grupo está comprometido com a matéria) | Definir de forma equilibrada as responsabilidades de cada membro | Mudar as responsabilidades dos membros, a fim de suprir a ausência do membro que trancou |
| Desentendimento entre membros do grupo | Alta | Cada membro deve ter, antes de mais nada, respeito pelo outro, a fim de evitar brigas desnecessárias. | O grupo deve se reunir como um todo a fim de encontrar uma solução para o conflito. |
| Problemas técnicos | Médio | Utilizar de tecnologias (como o docker) que evitem problemas técnicos. | Buscar soluções com pessoas que já passaram e resolveram o problema. |
| Falta de instrumento de desenvolvimento para algum membro | Baixo | Cada membro deve ser cuidadoso no uso e manutenção de seu computador. | Utilizar os computadores da BCE. |
| Falta de comunicação adequada entre os membros do grupo | Alta | Deve ser reforçada a importância dos meios definidos de comunicação, além da participação nos rituais Scrum. | Realizar reunião emergencial, com o intuito de que todos entendam o andamento do projeto. |






### Critérios de Replanejamento

 - Os critério de replanejamento  consistem nos problemas que obrigam os membros do grupo a replanejarem todo o projeto, e são baseados nos riscos envolvidos no projeto. Por isso um dos critérios de replanejamento são problemas de desentendimento entre os membros do grupo, que exigem que certas partes do projeto seja refeitas. Pois dependendo da gravidade das discussões internas, certos membros do grupo que anteriormente trabalhavam juntos precisam ser separados ou certas partes do produto precisam a ser refeitas. 
 - Outro critério de replanejamento é para o caso  de o grupo entender errado um requisito exigido pelo cliente e que faz com que o grupo seja obrigado a refazer o projeto ou replanejar certas etapas do projeto para cumprir os requisitos do cliente. 
 - Por fim, o último critério de replanejamento é no caso de problemas técnicos que exijam que a dinâmica do projeto deja repensada para que a mão de obra do grupo não seja afetada. 


## Processo de Desenvolvimento de Software

Vamos utilizar o framework Scrum/XP. Assim, todo o nosso processo vai ser de acordo com o Guia do Scrum e com o livro "Programação extrema(xp) explicada", do autor Kent Beck. Ou seja: vamos utilizar dos rituais (sprint planning, dailies, review e retrospective) e dos artefatos (sprint backlog e product backlog) SCRUM, além dos princípios, valores e processos que fazem o XP (pair programming, code review, etc. Explicado com mais detalhes acima, na sessão "ciclo de vida do projeto de desenvolvimento de software"). 


## Detalhamento de atividades do projeto

### Atividade 1

| Atividade             | Método                                                       | Ferramenta                                                   | Entrega                     |
| --------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | --------------------------- |
| Codificar a aplicação | Construir, a partir dos requisitos, o código da aplicação; Pair programming | Editores de texto e IDEs (de acordo com preferência individual) | Funcionalidade da aplicação |



### Atividade 2

| Atividade                        | Método                                                       | Ferramenta                                       | Entrega               |
| -------------------------------- | ------------------------------------------------------------ | ------------------------------------------------ | --------------------- |
| Definir os requisitos do produto | Construir, a partir dos objetivos do cliente, a lista de requisitos do produto | Microsoft Teams (para comunicação com o cliente) | Requisitos do produto |



### Atividade 3

| Atividade       | Método                                                       | Ferramenta                                     | Entrega                          |
| --------------- | ------------------------------------------------------------ | ---------------------------------------------- | -------------------------------- |
| Sprint planning | A partir do backlog, definir o escopo da sprint, ou seja, histórias de usuário e tasks adicionais que serão de utilidade para o projeto ou produto | Product Backlog<br>Sistemas de issue do github | Sprint Backlog<br>Meta da sprint |



### Atividade 4

| Atividade     | Método                                                       | Ferramenta                       | Entrega                                      |
| ------------- | ------------------------------------------------------------ | -------------------------------- | -------------------------------------------- |
| Sprint Review | Verificar se o trabalho realizado numa sprint atende à meta da sprint | Sprint Backlog<br>Meta da sprint | Parte do documento de review e retrospective |



### Atividade 5

| Atividade            | Método                                                       | Ferramenta                                                   | Entrega                                      |
| -------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | -------------------------------------------- |
| Sprint Retrospective | Verificar o trabalho realizado e entender o que poderíamos ter feito de melhor;<br>Metrificar o trabalho realizado e comparar com sprints anteriores | Sistema de issues do github<br>Meta da Sprint<br>Dados de sprints anteriores | Parte do documento de review e retrospective |



### Atividade 6

| Atividade   | Método                                                       | Ferramenta | Entrega           |
| ----------- | ------------------------------------------------------------ | ---------- | ----------------- |
| Code review | Revisar o trabalho (código feito) de uma task qualquer. Essa revisão é em busca de erros e melhorias. | Github     | Código atualizado |



## Lições Aprendidas

### Unidade 1

...

### Unidade 2

...

### Unidade 3

...



## Referências Bibliográficas

SCHWABER, Ken; SUTHERLAND, Jeff. **Guia do Scrum**: as regras do jogo. 2ª ed.
Rio de Janeiro: Elsevier, 2020.



BECK, Kent. **Programação extrema (xp) explicada**: acolha as mudanças. Porto
Alegre: Bookman, 2004.

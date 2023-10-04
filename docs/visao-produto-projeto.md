# Visão do produto e do projeto - Bracket

## Histórico de Revisão

| Data       | Versão | Descrição                                             | Autor(es)                       |
| ---------- | ------ | ----------------------------------------------------- | ------------------------------- |
| 03/10/2023 | 0.1    | Criação do documento (apenas o esqueleto)             | Lucas Queiroz                   |
| 03/10/2023 | 0.2    | Adição de tecnologias a serem utilizadas              | Lucas Queiroz<br>Philipe Morais |
| 03/10/2023 | 0.3    | Adição de alguns dos papéis na organização do projeto | Lucas Queiroz                   |
| 03/10/2023 | 0.4    | Adição do Ciclo de vida do projeto                    | João Eduardo P.                 |
| 03/10/2023 | 0.5    | Adição de dados do produto                            | Lucas Queiroz<br>Lucas Meireles |

## Visão Geral do Produto

### Problema

- Contexto: torneios de esportes eletrônicos.
- Problema: o chaveamento dos torneios ainda é realizado de forma manual, em que organizadores precisam verificar longos arquivos .csv para definir os confrontos.
- Solução: automatizar o processo de chaveamento dos torneios.

### Declaração de Posição do Produto

| Para:          | Organizadores de torneios de e-sports           |
| -------------- | ----------------------------------------------- |
| Necessidade:   | Chavear os jogadores do torneio                 |
| O Bracket:     | é uma solução web                               |
| Que:           | Auxilia no processo de chaveamento dos torneios |
| Ao contrário:  | Battlefy, Challengermode                        |
| Nosso produto: | Realiza o chaveamento de maneira automatizada   |



### Objetivos do Produto

- Automatizar o processo de chaveamento de torneios;
- Gerar relatórios de torneios (rodadas, jogadores, vencedores, etc);
- Reconhecer dados repetidos em torneios separados;

### Tecnologias a serem utilizadas

- Front-end: [React](https://react.dev)
- Back-end: [MySQL](https://mysql.com), [Node](https://nodejs.org), [Express](https://expressjs.com)
- Documentação: [MkDocs](https://https://www.mkdocs.org/)
- Conteinerização: [Docker](https://docker.com)

## Visão Geral do Projeto

### Ciclo de vida do projeto de desenvolvimento de software
Durante o ciclo de vida do projeto, adotaremos a metodologia Ágil para garantir uma interação contínua com nossos clientes. Isso nos permitirá receber feedback constante ao longo do processo de desenvolvimento. Para implementar essa abordagem, utilizaremos as práticas do SCRUM/XP, que se baseiam no "Guia do Scrum" e nas aulas disponibilizadas pela disciplina.

No que diz respeito ao desenvolvimento, utilizaremos o GitHub para gerenciar alterações e submissões de código, além do MkDocs para manter a documentação do projeto atualizada. Também incorporaremos outras ferramentas de desenvolvimento à medida que avançarmos no projeto.

Em relação ao método de trabalho, adotaremos o "Pair Programming", promovendo a colaboração entre os membros da equipe para o desenvolvimento e análise dos componentes trabalhados. Além disso, implementaremos revisões de código ("Code Review") como uma etapa essencial após cada sprint, garantindo o controle adequado das fases de desenvolvimento do projeto.


### Organização do Projeto

| Papel         | Atribuições                                                  | Responsável    | Participantes |
| ------------- | ------------------------------------------------------------ | -------------- | ------------- |
| Product Owner | Definir e organizar o Backlog do Produto;<br>Definir e organizar o Backlog da Sprint; | Lucas Meireles | Todo o grupo  |
| Desenvolvedor | Escrever os códigos da aplicação;<br>Escrever códigos de testes;<br>Documentar o código da aplicação. | Lucas Queiroz  | Todo o grupo  |
| Analista de Qualidade | Definir padrões para a qualidade do produto;<br>Estipular o cumprimento dos tópicos definidos do produto;<br>Trabalhar na análise da consistência do código fonte do produto; | ---------------  | Todo o grupo  |
| Cliente       | Verificar se o que foi definido no escopo está sendo entregue;<br>Auxiliar o Product Owner a definir o escopo do produto; | Lucas Meireles | Todo o grupo  |
|               |                                                              |                |               |
|               |                                                              |                |               |



### Planejamento das Fases e/ou Iterações do Projeto

| Sprint | Produto (entrega) | Data Início | Data Fim | Entregável(eis) | Responsáveis | % conclusão |
| ------ | ----------------- | ----------- | -------- | --------------- | ------------ | ----------- |
|        |                   |             |          |                 |              |             |
|        |                   |             |          |                 |              |             |
|        |                   |             |          |                 |              |             |
|        |                   |             |          |                 |              |             |
|        |                   |             |          |                 |              |             |



### Matriz de Comunicação




| Descrição | Área/Envolvidos | Periodicidade | Produtos Gerados |
| --------- | --------------- | ------------- | ---------------- |
|  As comunicações são realizadas tanto presencialmente quanto remotas e definem a capacidade do grupo de trabalhar em conjunto         |  As comunicações serão realizadas através das mídias sociais, como whatsapp e telegram, e as reuniões remotas serão feitas na plataforma teams enquanto as reuniões presenciais serão realizadas na própria FGA               | As reuniões serão uma vez por semana para planejar as sprints e depois verificar se os objetivos das sprints foram cumpridos              | Os produtos gerados serão as sprints prontas e as etapas do projeto cumpridas, assim como iremos também verificar se todos os testes e etapas de programação do produto foram cumpridos                 |
|           |                 |               |                  |
|           |                 |               |                  |
|           |                 |               |                  |
|           |                 |               |                  |



### Gerenciamento de Riscos  

| Riscos | Grau de exposição | Mitigação | Plano de Contigência |
| -------------- | --------------- | ------------- | ---------------- |
|  Os riscos mais prováveis seriam desentendimentos entre os membros do grupo, prejudicando a capacidade do grupo de trabalhar em equipe, depois problemas técnicos nas máquinas que os integrantes do grupo usam para programar e por fim falta de comunicação adequada entre os membros do grupo e o product owner, fazendo com que os membros façam um produto diferente do que o product owner deseja      |   Quanto ao grau de exposição, observamos que o grau de exposição mais alto é pertence ao risco de desententdimento entre os membros do grupo e portanto sua averiguação constante se torna necessária. Em seguida vem a possibilidade de problemas técnicos nas máquinas que o grupo usa para trabalhar e por fim as divergências entre o grupo e o product owner      | Para mitigar o risco de desentendimento entre os membros do grupo foi estabelecido que os membros do grupo devem estar sempre em contato constante e a opinião de todos deve ser respeitada para evitar discussões ou brigas. Quanto aos problemas técnicos nas máquinas os integrantes devem estar sempre atentos à situação de seu próprio equipamento para prevenir qualquer problema técnico. E por fim quanto à falta de comunicação entre os membros do grupo e o product owner a solução foi manter contato constante com o product owner através de todos os meios necessários para ter certeza de que o produto está atendendo a todos os requisitos exigidos  |  O plano de contigência  para o risco de brigas internas é que o grupo deve reunir para resolver qualquer desentendimento e o se nem mesmo assim a briga for resolvida então o scrum master possui a palavra final. Quanto à problemas na máquina o grupo irá se reunir para tentar pagar o conserto do estrago na máquina e por fim com relação ao desentendimento com o product owner o grupo irá se esforçar para corrigir o produto o mais rápido possível para que o produto atenda a todos os requisitos  |
|           |                 |               |                  |
|           |                 |               |                  |
|           |                 |               |                  |
|           |                 |               |                  |






### Critérios de Replanejamento

 - Os critério de replanejamento  consistem nos problemas que obrigam os membros do grupo a replanejarem todo o projeto, e são baseados nos riscos envolvidos no projeto. Por isso um dos critérios de replanejamento são problemas de desentendimento entre os membros do grupo, que exigem que certas partes do projeto seja refeitas. Pois dependendo da gravidade das discussões internas, certos membros do grupo que anteriormente trabalhavam juntos precisam ser separados ou certas partes do produto precisam a ser refeitas. 
 - Outro critério de replanejamento é para o caso  de o grupo entender errado um requisito exigido pelo cliente e que faz com que o grupo seja obrigado a refazer o projeto ou replanejar certas etapas do projeto para cumprir os requisitos do cliente. 
 - Por fim, o último critério de replanejamento é no caso de problemas técnicos que exijam que a dinâmica do projeto deja repensada para que a mão de obra do grupo não seja afetada. 
  

## Processo de Desenvolvimento de Software




## Detalhamento de atividades do projeto

### Atividade 1

| Atividade             | Método                                                    | Ferramenta                                                   | Entrega                     |
| --------------------- | --------------------------------------------------------- | ------------------------------------------------------------ | --------------------------- |
| Codificar a aplicação | Construir, a partir dos requisitos, o código da aplicação | Editores de texto e IDEs (de acordo com preferência individual) | Funcionalidade da aplicação |



### Atividade 2

| Atividade                        | Método                                                       | Ferramenta                                       | Entrega               |
| -------------------------------- | ------------------------------------------------------------ | ------------------------------------------------ | --------------------- |
| Definir os requisitos do produto | Construir, a partir dos objetivos do cliente, a lista de requisitos do produto | Microsoft Teams (para comunicação com o cliente) | Requisitos do produto |

### Atividade 3

| Atividade | Método | Ferramenta | Entrega |
| --------- | ------ | ---------- | ------- |
|           |        |            |         |



## Lições Aprendidas

### Unidade 1

...

### Unidade 2

...

### Unidade 3

...

### Unidade 4

...



## Próximos passos



## Referências Bibliográficas


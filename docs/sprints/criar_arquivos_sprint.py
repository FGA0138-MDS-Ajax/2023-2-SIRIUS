import os
import sys


def exibir_mensagem_erro():
    """
    Exibir mensagem de erro e fechar o programa.
    Chamada quando o usuário não coloca a entrada correta.
    """
    print("Erro no uso do script.")
    print("Uso correto: python3 criar_arquivos_sprint.py <numero da sprint>")
    print("<numero da sprint> deve ser um número natural.\n")

    sys.exit(1)


class CriadoraArquivos:
    """
    Classe para criar arquivos de template.
    """

    def __init__(self, numero_sprint=0):
        self.numero_sprint = self.tratar_entrada()
        self.path = self.criar_diretorio()

    def tratar_entrada(self) -> int:
        """
        Tratar a entrada por linha de comando.
        Caso o uso do programa seja correto, retorna o número da sprint.
        """
        tam_params = len(sys.argv)

        if tam_params != 2:
            exibir_mensagem_erro()

        # converter entrada para inteiro
        try:
            numero_sprint = int(sys.argv[1])

            if numero_sprint <= 0:
                raise ValueError

            return numero_sprint

        except ValueError:
            exibir_mensagem_erro()

    def criar_diretorio(self) -> str:
        """
        Criar o diretório da sprint.
        Retorna ele ou fecha o programa caso ocorra algum erro.
        """
        dir = f'./sprint-{self.numero_sprint}'
        try:
            os.mkdir(dir)
            return dir
        except Exception:
            print("Erro ao criar diretório")
            sys.exit(1)

    def criar_arquivo(self, nome_arquivo: str, conteudo_arquivo: str):
        """
        Criar um arquivo qualquer no diretório criado.
        """
        nome_arquivo = f's{self.numero_sprint}-{nome_arquivo}.md'

        try:
            arquivo = open(os.path.join(self.path, nome_arquivo), "a")
            arquivo.write(conteudo_arquivo)
            arquivo.close()

        except Exception as e:
            print(e)
            print(f"Erro ao criar {nome_arquivo}")
            sys.exit(1)


if __name__ == "__main__":

    criadora = CriadoraArquivos()

    params = []

    # criar parametros pro arquivo de dailies
    template_dailies = '## Daily dd/mm/aaaa\n'
    for name in [
            'Fábio',
            'João Eduardo',
            'João Pedro',
            'Lucas Queiroz',
            'Lucas Meireles',
            'Philipe',
            'Rodrigo'
    ]:
        template_dailies += f'### {name}\n'
        template_dailies += '- O que fiz ontem?\n- O que pretendo fazer hoje?\n- Existe algo que está me atrapalhando?'
        template_dailies += '\n\n'

    # criar parametros pro arquivo de planning
    template_planning = "## Sprint backlog" + 5 * '\n'
    template_planning += "## Meta da sprint" + 5 * '\n'
    template_planning += "## Bibliografia \n"
    template_planning += 'SCHWABER, Ken; SUTHERLAND, Jeff. **Guia do Scrum:** as regras do jogo. 2ª ed. Rio de Janeiro: Elsevier, 2020.\n'

    # criar parametros pro arquivo de retrospective
    template_review_retrospective = "## Review\n"
    template_review_retrospective += "### A meta da sprint foi atingida?\n\n"
    template_review_retrospective += "### As histórias de usuário propostas foram entregues?\n\n"
    template_review_retrospective += '\n\n'
    template_review_retrospective += "## Retrospective\n"
    template_review_retrospective += "### Quais foram as principais dificuldades durante a sprint?\n"
    template_review_retrospective += "### A equipe realizou as atividades definidas?\n"
    template_review_retrospective += "### A equipe teve alguma dificuldade técnica?\n"
    template_review_retrospective += '\n\n## Métricas'


    params.append(('review-retrospective', template_review_retrospective))
    params.append(('dailies', template_dailies))
    params.append(('planning', template_planning))

    for param in params:
        criadora.criar_arquivo(param[0], param[1])

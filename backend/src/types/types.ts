export enum EnumRodada {
  UM = 'UM',
  DOIS = 'DOIS',
  TRES = 'TRES',
  SEMIFINAL = 'SEMIFINAL',
  FINAL = 'FINAL',
}

export enum EnumVencedorPosicao {
  PRIMEIRO = 'PRIMEIRO',
  SEGUNDO = 'SEGUNDO',
  TERCEIRO = 'TERCEIRO',
  QUARTO = 'QUARTO',
}

export interface IPlayerDataProps {
  teamName: string
  inGameName: string
  checkedInAt: string
  id: string
  discordID: string
  email: string
}

export interface IPlayerEmGrupoDataProps {
  participanteID: string
  numeroRodada: EnumRodada
  grupoID: string
  torneioID: string
}

export interface IUserDataProps {
  name: string
  email: string
  password: string
}

export interface IRodadaDataProps {
  numeroRodada: EnumRodada
  torneioID: string
}

export interface IBuscaPlayerEmGrupoProps {
  nomeTorneio: string
  inGameName: string
  numeroRodada: EnumRodada
}

export interface IVencedorGrupoDataProps {
    participanteID: string
    grupoID:        string
    posicao:        EnumVencedorPosicao
}

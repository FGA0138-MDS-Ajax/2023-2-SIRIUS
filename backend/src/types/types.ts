// Enum usado para definir a rodada de um Torneio
export enum EnumRodada {
  UM = 'UM',
  DOIS = 'DOIS',
  TRES = 'TRES',
  SEMIFINAL = 'SEMIFINAL',
  FINAL = 'FINAL',
}

// Enum usado para definir a posição de um Vencedor
export enum EnumVencedorPosicao {
  PRIMEIRO = 'PRIMEIRO',
  SEGUNDO = 'SEGUNDO',
  TERCEIRO = 'TERCEIRO',
  QUARTO = 'QUARTO',
}

// Tipo usado para criar um Grupo
export type GrupoProps = string

// Tipo usado para criar um Torneio
export interface ITorneioProps {
  nome: string
  grupos: Array<IPlayerDataProps[]>
}

// Tipo usado para criar um Participante
export interface IPlayerDataProps {
  teamName: string
  inGameName: string
  checkedInAt: string
  id: string
  discordID: string
  email: string
}

// Tipo usado para criar um Participante em um Grupo
export interface IPlayerEmGrupoDataProps {
  participanteID: string
  numeroRodada: EnumRodada
  grupoID: string
  torneioID: string
}

// Tipo usado para criar uma Rodada
export interface IRodadaDataProps {
  numeroRodada: EnumRodada
  torneioID: string
}

// Tipo usado para realizar busca de Participante em um Grupo (US3)
export interface IBuscaPlayerEmGrupoProps {
  nomeTorneio: string
  inGameName: string
  numeroRodada: EnumRodada
}

// Tipo usado para criar um Vencedor de Grupo
export interface IVencedorGrupoDataProps {
  participanteID: string
  grupoID: string
  posicao: EnumVencedorPosicao
}

// Tipo usado para criar um Vencedor de Torneio
export interface IVencedorTorneioDataProps {
  participanteID: string
  torneioID: string
  posicao: EnumVencedorPosicao
}

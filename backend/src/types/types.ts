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
  grupoID: string
  torneioID: string
}

export interface IUserDataProps {
  name: string
  email: string
  password: string
}

export enum EnumRodada {
    UM = "UM",
    DOIS = "DOIS",
    TRES = "TRES",
    SEMIFINAL = "SEMIFINAL",
    FINAL = "FINAL",
}

export interface ICriarRodada {
    numeroRodada: EnumRodada
    torneioID: string
}

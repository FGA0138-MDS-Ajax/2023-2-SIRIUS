import { IPlayerDataProps } from './playerType'

export interface ICriarParticipantesProps {
    participantes: IPlayerDataProps[]
}

export interface ICriarTorneioProps {
    nome: string
}

export interface ICriarRodadaProps {
    torneioID: string
}

export interface ICriarGrupoProps {
    rodadaID: string
}

export interface ICriarParticipanteEmGrupoProps {
    participanteEmGrupo:{
        grupoID: string
        participanteID: string
        torneioID: string
    }[]
}


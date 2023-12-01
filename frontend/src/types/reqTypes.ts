import { PlayerData } from './playerType'

export interface CriarParticipantes {
    participantes: PlayerData[]
}

export interface CriarTorneio {
    nome: string
}

export interface CriarRodada {
    torneioID: string
}

export interface CriarGrupo {
    rodadaID: string
}

export interface CriarParticipanteEmGrupo {
    participanteEmGrupo:{
        grupoID: string
        participanteID: string
    }[]
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import { API } from '../../server/api'

interface PlayerData {
  teamName: string
  inGameName: string
  checkedInAt: string
  userID: string
  discordID: string
  email: string
}

const GroupButton = ({ dadosJson }: { dadosJson: PlayerData[] }) => {
  const [playerData, setPlayerData] = useState<PlayerData[]>([])

  useEffect(() => {
    setPlayerData(dadosJson.filter((player: any) => player.checkedInAt !== ''))
  }, [dadosJson])

  const groupPlayers = async () => {

    const qtdJogadoresQueFizeramCheckin = playerData.length

    // a variável `quantidadeJogadoresPorGrupo` é um vetor que guarda o que o nome diz.
    // Além disso, o seu `length` indica quantos grupos existem no torneio.
    const quantidadeJogadoresPorGrupo = (
      await API.get(`/calcularQuantidadeGrupos/${qtdJogadoresQueFizeramCheckin}`)
    ).data.jogadoresPorGrupo
    const gruposDoTorneio: Array<Array<PlayerData>> = []

    let playerPos = 0
    for (let i = 0; i < quantidadeJogadoresPorGrupo.length; i++) {
      const groupSize = quantidadeJogadoresPorGrupo[i]
      gruposDoTorneio.push([])
      const pos = gruposDoTorneio.length - 1

      while(gruposDoTorneio[pos].length < groupSize) {
        gruposDoTorneio[pos].push(playerData[playerPos])
        playerPos++
      }
    }

    // a variável abaixo é um vetor de vetor de jogadores.
    // Um vetor de jogadores constitui um grupo.
    // Sendo assim, a variável abaixo constitui um vetor de grupos.
    // Esse vetor deve ser usado para formar as tabelas no frontend.
    // Além disso, deve ser enviado ao backend para salvar no banco de dados.
    console.log(gruposDoTorneio)
  }

  return (
    <button onClick={() => groupPlayers()}>me aperte aaaa</button>
  )
}

export default GroupButton

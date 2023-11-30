/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import { API } from '../../server/api'
import { motion } from 'framer-motion'
import { PlayerData } from '../../types'

const GroupButton = ({ dadosJson }: { dadosJson: PlayerData[]}) => {
  const [playerData, setPlayerData] = useState<PlayerData[]>([])

  useEffect(() => {
    setPlayerData(dadosJson.filter((player: any) => player.checkedInAt !== ''))
  }, [dadosJson])

  const groupPlayers = async () => {

    const qtdJogadoresQueFizeramCheckin = playerData.length

    // a variável `quantidadeJogadoresPorGrupo` é um vetor que guarda o que o nome diz.
    // Além disso, o seu `length` indica quantos grupos existem no torneio.
    const quantidadeJogadoresPorGrupo = (
      await API.get(`/grupos/quantidade/${qtdJogadoresQueFizeramCheckin}`)
    ).data.jogadoresPorGrupo
    
    const gruposDoTorneio: Array<Array<PlayerData>> = []
    let playerPos = 0
    for (let i = 0; i < quantidadeJogadoresPorGrupo.length; i++) {
      const groupSize = quantidadeJogadoresPorGrupo[i]
      gruposDoTorneio.push([])
      const pos = gruposDoTorneio.length - 1

      while (gruposDoTorneio[pos].length < groupSize) {
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
    <motion.button
      type='button'
      className="-mt-12 inline-block lg:py-4 lg:px-12 md:py-4 md:px-12 py-2 px-10 bg-gradient rounded-full text-lg text-white text-center font-caustenBd shadow-lg hover:scale-110 duration-300 ease-in-out"
      onSubmit={() => groupPlayers()}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}>
      Agrupar Jogadores
    </motion.button>
  )
}

export default GroupButton

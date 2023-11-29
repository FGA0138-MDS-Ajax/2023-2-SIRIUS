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
    console.log(playerData)

    const Num_checkin = playerData.length
    const grupos = await API.get(`/calcularQuantidadeGrupos/${Num_checkin}`)
    const arr_ret: Array<Array<PlayerData>> = []

    let pos = 0
    for (let i = 0; i < grupos.data.length; i++) {
      const groupSize = grupos.data[i]
      const group: Array<PlayerData> = []

      for (let j = 0; j < groupSize; j++) {
        group.push(playerData[pos])
        pos++
      }
      arr_ret.push(group)
    }

    console.log(arr_ret)
  }

  return (
    <button onClick={() => groupPlayers()}>me aperte aaaa</button>
  )
}

export default GroupButton

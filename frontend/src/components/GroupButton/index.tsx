/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { API } from '../../server/api'

interface PlayerData {
    teamName: string
    inGameName: string
    checkedInAt: string
    userID: string
    discordID: string
    email: string
}

const GroupButton = ({jsonData}) => {
  const [playerData, setPlayerData] = useState<PlayerData[]>([])

  const groupPlayers = async () => {
      setPlayerData(
          jsonData.filter((player) => player.checkedInAt !== '')
      )
      const Num_checkin = playerData.length
      const grupos = await API.get(`/calcularQuantidadeGrupos/:${Num_checkin}`)

      let pos = 0
      let count = 0
      const arr_ret: Array<Array<PlayerData>> = []

      for(const player of playerData) {
          arr_ret[pos].push(player)
          count++
          if(count >= grupos[pos]) {
              count = 0
              pos++
          }
      }

      console.log(arr_ret)
  }

  return (
      <button
        onClick={groupPlayers()}
      > me aperte aaaa
      </button>
  )
}

export default GroupButton

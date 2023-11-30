import { PlayerData } from '../../types'

const AllJogadores = ({ dadosJson }: { dadosJson: PlayerData[] }) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl text-center font-caustenBd mb-4'>Arquivo CSV Transformado para JSON:</h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-200 shadow-xl">
          <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-[#2D2D2F] dark:text-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3">
                        Game Name
              </th>
              <th scope="col" className="px-6 py-3">
                        Discord ID
              </th>
            </tr>
          </thead>
          <tbody>
            {dadosJson.map((item: PlayerData, index: number) => (
              <tr key={index} className="odd:bg-white odd:dark:bg-[#344981] even:bg-gray-50 even:dark:bg-[#2D2D2F] border-b dark:border-gray-700">
                <td className="px-6 py-4">{item.inGameName}</td>
                <td className="px-6 py-4">{item.discordID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllJogadores
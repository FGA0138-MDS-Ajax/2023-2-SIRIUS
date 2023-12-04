import { IPlayerDataProps } from '../../types/playerType'

const ParticipantsTable = ({ dadosJSON }: { dadosJSON: IPlayerDataProps[]}) => {

  return (
    <section className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl text-center font-caustenBd mb-4'>Todos os Jogadores Importados:</h2>
      <div className="relative shadow-lg sm:rounded-lg">
        <table className="w-full text-lg text-left rtl:text-right text-gray-200 shadow-xl">
          <thead className="text-sm uppercase bg-[#2D2D2F] text-gray-300">
            <tr className='text-center'>
              <th scope="col" className="px-6 py-3">
                        Game Name
              </th>
              <th scope="col" className="px-6 py-3">
                        Discord ID
              </th>
            </tr>
          </thead>
          <tbody>
            {dadosJSON.map((item: IPlayerDataProps, index: number) => (
              <tr key={index} className=" odd:bg-[#344981] even:bg-[#2D2D2F] border-b border-gray-700">
                <td className="px-6 py-4">{item.inGameName}</td>
                <td className="px-6 py-4">{item.discordID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ParticipantsTable

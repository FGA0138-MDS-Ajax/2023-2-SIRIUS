import BounceLoader from 'react-spinners/BounceLoader'
import { ILoadingSpinnerProps } from './type'

const LoadingSpinner = ({ loading }: ILoadingSpinnerProps) => {
  return (
    <div className="flex items-center">
      <BounceLoader color={'#344981'} loading={loading} size={70} aria-label="Loading Spinner" data-testid="loader" />
      <p className="text-gray-200 text-2xl ml-4 font-caustenBd">Carregando Dados...</p>
    </div>
  )
}

export default LoadingSpinner
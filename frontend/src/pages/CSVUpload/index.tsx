import Footer from '../../components/Footer'
import Header from '../../components/Header'
import InputCSV from '../../components/InputCSV'

const CSVUpload = () => {
  return (
    <>
      <Header autenticado={true} />
      <InputCSV />
      <Footer />
    </>
  )
}

export default CSVUpload

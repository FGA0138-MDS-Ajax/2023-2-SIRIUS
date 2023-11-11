import Layout from './components/Layout'
import CSVUpload from './pages/CSVUpload'
import Home from './pages/Home'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

const App = () => {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/csvuploader" element={<CSVUpload />} />
        </Routes >
      </Layout>
    </Router>
  )
}

export default App

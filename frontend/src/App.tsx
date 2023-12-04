import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

import Layout from './components/Layout'
import CSVUpload from './pages/CSVUpload'
import Home from './pages/Home'
import Login from './pages/Login'

const App = () => {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/csvuploader" element={<CSVUpload />} />
          <Route path="/login" element={<Login />} />
        </Routes >
      </Layout>
    </Router>
  )
}

export default App

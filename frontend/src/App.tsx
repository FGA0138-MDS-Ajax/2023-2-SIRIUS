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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/csvuploader" element={<CSVUpload />} />
      </Routes >
    </Router>
  )
}

export default App

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

import CSVUpload from './pages/CSVUpload'
import Home from './pages/Home'
import Login from './pages/Login'

const App = () => {

  return (
    <Router>
      <div className='bg-[#353535] background'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/csvuploader" element={<CSVUpload />} />
          <Route path="/login" element={<Login />} />
        </Routes >
      </div>
    </Router>
  )
}

export default App

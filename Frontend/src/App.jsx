import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './pages//Home.jsx';
import Student from './pages/Student.jsx';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student" element={<Student/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from './Dashboard';
import PlayerDetail from './PlayerDetail';
import Navbar from './components/Navbar';



function App() {

  return (
    <Router>
       <Navbar />
        <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/player/:id" element={<PlayerDetail />} />
        </Routes>
    </Router >
  );
}

export default App

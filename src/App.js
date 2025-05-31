import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from './components/Sidebar';
import Search from './components/Search';
import Home from './Home';
import Create from './Create';
import Chat from './Chat';
import Settings from './Settings';

function App() {
  return (
    <Router>

        <Sidebar />
          <Search />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Create" element={<Create />} />
            <Route path="/Chat" element={<Chat />} />
            <Route path="/Settings" element={<Settings />} />
          </Routes>

    </Router>
  );
}

export default App;

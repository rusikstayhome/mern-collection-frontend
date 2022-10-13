import './App.css';
import { Route, Routes } from "react-router-dom";


import Header from './components/Header/Header';
import Home from './pages/Home/Home';



function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;

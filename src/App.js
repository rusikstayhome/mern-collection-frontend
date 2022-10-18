import './App.css';
import { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import AddCollection from './pages/AddCollection/AddCollection';
import FullCollection from './pages/FullCollection/FullCollection';

import { fetchAuthMe } from './redux/slices/auth'



function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections/:id" element={<FullCollection />} />
        <Route path="/add-collection" element={<AddCollection />} />
      </Routes>
    </>
  );
}

export default App;

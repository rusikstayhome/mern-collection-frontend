import './App.css';
import { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import AddCollection from './pages/AddCollection/AddCollection';
import FullCollection from './pages/FullCollection/FullCollection';
import FullItem from './pages/FullItem/FullItem';
import MyCollections from './pages/MyCollections/MyCollections';
import Users from './pages/Users/Users';

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
        <Route path="/collections/:id/edit" element={<AddCollection />} />
        <Route path="/collections/:id/item/:itemId" element={<FullItem />} />
        <Route path="/add-collection" element={<AddCollection />} />
        <Route path="/collections" element={<MyCollections />} />
        <Route path="/collections/admin/:userId" element={<MyCollections isAdminWatching={true} />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </>
  );
}

export default App;

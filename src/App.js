import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Events from './pages/Events';
import Groups from './pages/Groups';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div>
      <Sidebar></Sidebar>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>} />
          <Route path='/home' element={<Home/>}/>
          <Route path='/events' element={<Events/>}/>
          <Route path='/groups' element={<Groups/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
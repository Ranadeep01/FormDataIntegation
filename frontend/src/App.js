import React, { useState } from 'react';
import './App.css';
import First from './components/First';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import Input from './components/Input';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



function App() { 

  const [edit, setEdit] = useState(false)

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home edit={edit} setEdit={setEdit} />} />
          <Route path="/first" exact element={<First />} />
          <Route path='/input' exact element={<Input edit={edit} setEdit={setEdit} />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
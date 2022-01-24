import React from "react";
import logo from '../assets/logo.svg';
import '../styles/App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  withRouter
} from "react-router-dom";

import NotFound from './NotFound';
import Login from './Login';
import Dashboard from './Dashboard';
import EatableTable from './Eatable/table';

// import login from '../services/auth'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/eatables" element={<EatableTable />} />
        <Route exact path='/' element={<Dashboard />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

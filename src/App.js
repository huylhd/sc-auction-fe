import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HomePage from './pages/HomePage';
import Detail from './pages/Detail';

function App() {
  return (
    <Router>
      <div class="pb-5">
        <nav class="navbar justify-content-between px-md-5 px-3 mb-5">
          <Link to="/"><img class="nav-logo" src="/logo.png" alt="logo" /></Link>
          <span class="justify-content-center align-items-center">
            <span class="me-2">Huy</span>
            <img class="nav-avatar" src="/user-avatar.png" alt="avatar" />
          </span>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/detail/:productId">
            <Detail />
          </Route>
          
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>

        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;

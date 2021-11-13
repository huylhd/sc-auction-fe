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
import UserDropdown from './components/UserDropdown';
import Setting from './pages/Setting';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div class="pb-5">
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/detail/:productId">
            <Detail />
          </Route>

          <Route path="/setting">
            <Setting />
          </Route>

          <Route path="/login">
            <Login />
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

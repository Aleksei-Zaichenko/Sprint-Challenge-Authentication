import React from 'react';
import React from 'react';
import {Login} from './components/LoginPage';
import {JokesList} from './components/JokesList';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <PrivateRoute exact path="/jokes" component={JokesList} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

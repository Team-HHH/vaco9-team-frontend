import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Home from '../pages/Home';
import CreateCampaign from '../pages/CreateCampaign';
import Login from '../pages/Login';
import Register from '../pages/Register';
import DashBoard from '../pages/Dashboard';
import PrivateRoute from '../helpers/PrivateRoute';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <PrivateRoute path="/campaign/new">
          <CreateCampaign />
        </PrivateRoute>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <PrivateRoute path="/dashboard">
          <DashBoard />
        </PrivateRoute>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

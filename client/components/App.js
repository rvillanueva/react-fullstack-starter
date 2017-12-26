/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import HomePage from './Home/HomePage';
import FuelSavingsPage from './FuelSavings/FuelSavingsPage';
import LoginPage from './Login/LoginPage';
import SettingsPage from './Settings/SettingsPage';
import AdminPage from './Admin/AdminPage';
import ThingsPage from './Things/ThingsPage';
import NotFoundPage from './NotFoundPage';
import Navbar from './Navbar/Navbar';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar path={this.props.history} />
        <div className="container">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/fuel-savings" component={FuelSavingsPage} />
            <Route path="/things" component={ThingsPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/admin" component={AdminPage} />
            <Route path="/settings" component={SettingsPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;

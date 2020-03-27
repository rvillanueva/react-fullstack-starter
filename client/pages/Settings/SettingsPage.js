import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  UserSettingsPage,
  SettingsOverviewPage
} from './components';
import './settings-page.scss';

export default class AccountPageContainer extends React.Component {
  render() {
    return <div className="container container--small">
      <div className="page-body">
        <Switch>
          <Route path="/settings/user" exact component={UserSettingsPage} />
          <Route path="/settings" exact component={SettingsOverviewPage} />
        </Switch>
      </div>
    </div>;
  }
}

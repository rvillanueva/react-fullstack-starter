import React from 'react';
import {Link} from 'react-router-dom';

const SettingsOverviewPage = () =>
  <div>
    <div className="card">
      <div className="card__heading">
        <span className="card__title">Settings</span>
      </div>
      <div className="card__body card__list">
        <Link className="card__list__item card__list__item--padded card__list__item--clickable unstyled-link" to="/settings/account">
          Account
        </Link>
        <Link className="card__list__item card__list__item--padded card__list__item--clickable unstyled-link" to="/settings/integrations">
          Integrations
        </Link>
      </div>
    </div>
  </div>;

export default SettingsOverviewPage;

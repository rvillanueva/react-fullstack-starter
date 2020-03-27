import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () =>
  <div className="page-body">
    <div className="card card-body">
      <h4>
        404 Page Not Found
      </h4>
      <Link to="/"> Go back to homepage </Link>
    </div>
  </div>
;

export default NotFoundPage;

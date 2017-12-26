import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="card card-full top-spaced">
      <h1>React Fullstack</h1>

      <h2>Get Started</h2>
      <ol>
        <li>Review the <Link to="/fuel-savings">demo app</Link></li>
        <li>Remove the demo and start coding: npm run remove-demo</li>
      </ol>
      <Link to="/badlink">Click this bad link</Link> to see the 404 page.
    </div>
  );
};

export default HomePage;

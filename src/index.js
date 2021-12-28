import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

// TODO: wrap everything in Auth0

ReactDOM.render(
  
    <Auth0Provider
      domain='dev-qjc40gb9.us.auth0.com'
      clientId='yL8gYQD16wklUEDUZArBhvEJhEt72XsK'
      redirectUri={window.location.origin}
      // onRedirectCallback={onRedirectCallback}
    >
      <App />
  </Auth0Provider>
    ,
  document.getElementById('root')
);

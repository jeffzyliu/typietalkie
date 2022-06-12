import React from 'react';
import { createRoot } from 'react-dom/client';

import './style.scss';

import App from './app';

const root = createRoot(document.getElementById('main'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

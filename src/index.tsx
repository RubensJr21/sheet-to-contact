import React from 'react';
import ReactDOM from 'react-dom/client';

import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.min.js'
import "bootstrap-icons/font/bootstrap-icons.css";
import { TableProvider } from './Contexts/Table';

import App from './App';
import { FormatProvider } from './Contexts/Format';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <TableProvider>
      <FormatProvider>
        <App />
      </FormatProvider>
    </TableProvider>
  </React.StrictMode>
);

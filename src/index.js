import React from 'react';
import ReactDOM from 'react-dom/client'; 
import './App.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
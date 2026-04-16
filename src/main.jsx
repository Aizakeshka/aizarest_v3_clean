import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const APP_VERSION = 'v1.0.0';
if (localStorage.getItem('aizarest_version') !== APP_VERSION) {
  // Only clear cached data — preserve auth so returning users stay logged in
  ['aizarest_restaurants', 'aizarest_bookings'].forEach(k => localStorage.removeItem(k));
  localStorage.setItem('aizarest_version', APP_VERSION);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

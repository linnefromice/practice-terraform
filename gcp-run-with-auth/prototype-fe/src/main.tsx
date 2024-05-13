import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config/firebase.ts';

initializeApp(firebaseConfig);
// console.log(getApp()); // debug

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

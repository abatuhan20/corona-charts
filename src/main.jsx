import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles.css'
import { registerLicense } from '@syncfusion/ej2-base';

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
console.log(apiKey);
//VITE BU ŞEKİLDE ALIYOR ENV VARIABLE
registerLicense(`${apiKey}`);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import "./fonts/line-awesome-1.3.0/css/line-awesome.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
}

const customTheme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        h: 'auto',
        w: 'auto',
        borderRadius: 20,
      },
    },
  }, 
  colors: {
    indigo: {
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      600: "#2563eb",
    },
    green: {
      100: "#f0fff4",
      // ...
      600: "#0EBF29",
    }
  },
}, config);

root.render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

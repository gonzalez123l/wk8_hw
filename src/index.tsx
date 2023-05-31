import React from 'react';
import ReactDOM from 'react-dom';
import { Home,Dashboard,SignIn, SignUp } from './components';
import reportWebVitals from './reportWebVitals';
// Import From react-router-dom & Components
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


//...other imports above
import { theme } from './Theme/themes';
import { ThemeProvider } from '@mui/material/styles';
//...Other imports above 

import { Provider } from 'react-redux';
import { store } from './redux/store';

import './styles.css'
import { FirebaseAppProvider } from 'reactfire';
import 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';


ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
     <Provider store = {store}>    {/* Add this line */ }
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/' element={<Home title  ={'Car Inventory'}/>} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </Router>
    </ThemeProvider>
    </Provider>                   {/* Add this line */ }
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

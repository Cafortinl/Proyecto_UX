import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { getAuth } from 'firebase/auth';
import { FirebaseAppProvider, AuthProvider, useFirebaseApp } from 'reactfire';

const firebaseConfig = {
  apiKey: "AIzaSyAkid5W9Od4W-yyMUd-8vANlv-qw-oLC7s",
  authDomain: "proyectoux-11911015.firebaseapp.com",
  projectId: "proyectoux-11911015",
  storageBucket: "proyectoux-11911015.appspot.com",
  messagingSenderId: "321865487132",
  appId: "1:321865487132:web:97599d83bb4692f37920d9"
};

function FirebaseInitializedApp() {
  const firebaseAuth = getAuth(useFirebaseApp());

  return (
    <AuthProvider sdk={firebaseAuth}>
      <App />
    </AuthProvider>
  );
}

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <FirebaseInitializedApp />
  </FirebaseAppProvider>,
  document.getElementById('root')
);
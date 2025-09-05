import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './Login';
import CigarIntro from './CigarIntro';

function Root() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  useEffect(() => {
    setIsAuthed(localStorage.getItem('isAuthenticated') === 'true');
  }, []);
  // DEBUG: force-show intro on every page load
  useEffect(() => {
    setShowIntro(true);
  }, []);
  useEffect(() => {
    if (isAuthed) {
      setShowIntro(true);
    }
  }, [isAuthed]);

  if (!isAuthed) {
    return <Login onSuccess={() => setIsAuthed(true)} />;
  }

  return (
    <>
      {showIntro && (
        <CigarIntro onFinish={() => { setShowIntro(false); }} />
      )}
      <App />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import { ThemeProvider } from './src/contexts/ThemeContext'; 
import Routes from './src/routes';
import CheckNetwork from './src/pages/CheckNetwork';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <CheckNetwork />  
        <Routes />
      </ThemeProvider>
    </AuthProvider>
  );
}

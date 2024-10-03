import React, { createContext, useState, useContext, ReactNode } from 'react';
import { MD3DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native'; 

type ThemeContextType = {
  toggleTheme: () => void;
  isDarkTheme: boolean;
  theme: typeof defaultTheme;  
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const defaultTheme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    background: '#ffebf0',  
    primary: '#ff69b4',     
  },
};

const darkTheme = {
  ...PaperDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    background: '#121212',  
    primary: '#bb86fc',   
  },
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  const theme = isDarkTheme ? darkTheme : defaultTheme;

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDarkTheme, theme }}> 
      <PaperProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          {children}
        </StyledThemeProvider>
      </PaperProvider>
    </ThemeContext.Provider>
  );
  
};

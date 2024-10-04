import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useTheme } from '../../contexts/ThemeContext'; 
import styles from './styles'; 

const Settings: React.FC = () => {
  const { toggleTheme, isDarkTheme, theme } = useTheme(); 

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={styles.text}>
        Tema Atual: {isDarkTheme ? 'Dark' : 'Claro'}
      </Text>
      <Button mode="contained" onPress={toggleTheme}>
        Mudar Tema
      </Button>
    </View>
  );
};

export default Settings;

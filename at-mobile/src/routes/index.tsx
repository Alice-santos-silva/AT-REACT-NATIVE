import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import TabRoutes from './tabRoutes';
import DrawerRoutes from './drawer.routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../pages/Login';
import Register from '../pages/Register';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const { user, loading } = useAuth();

  if (loading) {
    return null; 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="DrawerRoutes"
              component={DrawerRoutes}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TabRoutes"
              component={TabRoutes}
              options={{ headerShown: false }} 
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

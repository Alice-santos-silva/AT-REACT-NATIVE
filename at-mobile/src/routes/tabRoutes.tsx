import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import Profile from '../pages/Profile';
import Register from '../pages/Register';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#ffe4e1' },
      }}
    >
      <Tab.Screen
        name="Meu Perfil"
        component={Profile}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => <Feather name="user" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Cadastre-se"
        component={Register}
        options={{
          tabBarLabel: 'Cadastre-se',
          tabBarIcon: ({ color, size }) => <Feather name="edit" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

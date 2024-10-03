import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import Profile from '../pages/Profile';
import Budget from '../pages/Budget';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#ffe4e1' },
      }}
    >
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => <Feather name="user" color={color} size={size} />,
        }}
      />
      
      <Tab.Screen
        name="Orçamento"
        component={Budget}
        options={{
          tabBarLabel: 'Orçamento',
          tabBarIcon: ({ color, size }) => <Feather name="dollar-sign" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

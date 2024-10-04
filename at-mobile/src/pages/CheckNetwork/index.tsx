import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as Network from 'expo-network';

const CheckNetwork = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const checkNetwork = async () => {
      const networkState = await Network.getNetworkStateAsync();
      const isConnectedState = networkState.isConnected ?? false;

      if (isConnected !== isConnectedState) {
        setIsConnected(isConnectedState);
        
        if (isConnectedState) {
          Alert.alert('Conexão', 'Conectado à Internet');
        } else {
          Alert.alert('Conexão', 'Sem conexão com a Internet');
        }
      }
    };

    const interval = setInterval(checkNetwork, 5000);

    checkNetwork();

    return () => clearInterval(interval);
  }, [isConnected]);

  return null; 
};

export default CheckNetwork;

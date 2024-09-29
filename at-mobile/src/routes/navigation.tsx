import { DrawerScreenProps } from '@react-navigation/drawer';

export type RootDrawerParamList = {
  Profile: undefined;
  Login: undefined;
  Register: undefined;
};

export type ProfileScreenNavigationProp = DrawerScreenProps<RootDrawerParamList, 'Profile'>;
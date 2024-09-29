import { createDrawerNavigator } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import MyCamera from "../pages/MyCamera";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator screenOptions={{
      drawerStyle: {
        backgroundColor: '#ffe4e1'
      }
    }}>
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{ drawerIcon: () => <Feather name="log-in" /> }}
        
      />
      <Drawer.Screen
        name="Register"
        component={Register}
        options={{ drawerIcon: () => <Feather name="edit" /> }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{ drawerIcon: () => <Feather name="user" /> }}
      />
      <Drawer.Screen
        name="Fotos"
        component={MyCamera}
        options={{ drawerIcon: () => <Feather name="camera" /> }}
      />
    </Drawer.Navigator>
  );
}

import { createDrawerNavigator } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import MyCamera from "../pages/MyCamera";
import MyGallery from "../pages/MyGallery";
import Budget from "../pages/Budget";
import Planner from "../pages/Planner";
import { useState } from "react";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  const [photos, setPhotos] = useState<string[]>([]); 

  const addPhoto = (uri: string) => {
    setPhotos((prevPhotos) => [...prevPhotos, uri]); 
  };

  const RenderCameraScreen = (props: any) => <MyCamera {...props} addPhoto={addPhoto} />;
  const RenderGalleryScreen = (props: any) => <MyGallery {...props} photos={photos} />;

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#ffe4e1',
        },
      }}
    >
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
        name="Camera"
        component={RenderCameraScreen} 
        options={{ drawerIcon: () => <Feather name="camera" /> }}
      />
      <Drawer.Screen
        name="Clicks da viagem"
        component={RenderGalleryScreen} 
        options={{ drawerIcon: () => <Feather name="image" /> }}
      />
      <Drawer.Screen
        name="Orçamento da viagem"
        component={Budget} 
        options={{ drawerIcon: () => <Feather name="dollar-sign" /> }}
      />
      <Drawer.Screen
        name="Checklist da viagem"
        component={Planner} 
        options={{ drawerIcon: () => <Feather name="check-square" /> }}
      />
    </Drawer.Navigator>
  );
}

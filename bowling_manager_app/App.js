import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from  '@react-navigation/native-stack';
import {
  getData
} from "./helpers/asyncStorageFunctions"
import {useEffect, useState} from "react";

const Stack = createNativeStackNavigator()

import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";

import {ActivityIndicator} from "react-native";

const Application = () => {
  return(
      <Stack.Navigator>
        <Stack.Screen name={"Home"} component={Home}/>
        {/*<Stack.Screen name={"Lane"}/>*/}
      </Stack.Navigator>
  )
}

const Auth = () => {
  return(
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name={"Login"} component={Login}/>
        <Stack.Screen options={{headerShown: false}} name={"Register"} component={Register}/>
        {/*<Stack.Screen name={"Admin"}/>*/}
      </Stack.Navigator>
  )
}

export default function App() {

    const [isLogged, setIsLogged] = useState(false);
    const [appIsReady,setIsAppReady] = useState(false)

    const get = async () => await getData("isLogged").then(resp=>{
        if(resp!=isLogged){setIsLogged(resp);}
        setIsAppReady(true)
    })
    get();
    return (

      <NavigationContainer>
          {
              appIsReady?
              isLogged === true ? Application() : Auth()
                  :
                  <ActivityIndicator/>
          }
      </NavigationContainer>

  );
}

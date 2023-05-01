import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from  '@react-navigation/native-stack';
import {
    getData
} from "./helpers/asyncStorageFunctions"
import {useContext, useEffect, useState} from "react";

const Stack = createNativeStackNavigator()

import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";

import {ActivityIndicator} from "react-native";

import {AuthContext} from "./context/AuthContext";

const Application = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name={"Home"} component={Home}/>
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
    const [isLogged, setIsLogged]= useState(false)
    const get = async()=>{
        await getData("isLogged").then(res=>{
            setIsLogged(res === true);
        });
    }
    get();
    return (
        <AuthContext.Provider value={{isLogged,setIsLogged}}>
            <NavigationContainer>
                {
                    isLogged === true ? <Application /> : <Auth />
                }
            </NavigationContainer>
        </AuthContext.Provider>
    );
}

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
import Lane from "./screens/Lane";

import {AuthContext} from "./context/AuthContext";


const Application = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name={"Home"} component={Home}/>
            <Stack.Screen options={{headerShown: false}} name={"Lane"} component={Lane}/>
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
    const [lanes, setLanes] = useState()
    const get = async()=>{
        await getData("isLogged").then(res=>{
            setIsLogged(res === true);
        });
        await fetch("http://192.168.100.26:1337/api/lanes",{method:"GET"})
            .then(resp=>resp.json())
            .then(resp=>{
                let aux = [];
                resp.data.map(lane=>{
                    aux = [...aux,{
                        "players":lane.attributes.players,
                        "start":lane.attributes.start,
                        "available":lane.attributes.available
                    }]
                })
                setLanes(aux);
            })
    }
    useEffect(()=>{get();},[])
    return (
        <AuthContext.Provider value={{isLogged,setIsLogged,lanes,setLanes}}>
            <NavigationContainer>
                {
                    isLogged === true ? <Application /> : <Auth />
                }
            </NavigationContainer>
        </AuthContext.Provider>
    );
}

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
import {ip} from "./ipConfig"

import {AuthContext} from "./context/AuthContext";
import AdminLogin from "./screens/AdminLogin";
import AddPlayers from "./screens/AddPlayers";


const Application = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name={"Home"} component={Home}/>
            <Stack.Screen options={{headerShown: false}} name={"Lane"} component={Lane}/>
            <Stack.Screen options={{headerShown: false}} name={"AddPlayers"} component={AddPlayers}/>
        </Stack.Navigator>
    )
}

const Auth = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name={"Login"} component={Login}/>
            <Stack.Screen options={{headerShown: false}} name={"Register"} component={Register}/>
            <Stack.Screen options={{headerShown: false}} name={"Admin"} component={AdminLogin}/>
        </Stack.Navigator>
    )
}

export default function App() {
    const [isLogged, setIsLogged]= useState(false)
    const [lanes, setLanes] = useState()
    const [admin,setAdmin] = useState(false)
    const get = async()=>{
        await getData("isLogged").then(res=>{
            setIsLogged(res === true);
        });
        await getData("admin").then(res=>{
            setAdmin(res===true);
        })
        await fetch("http://"+ip+":1337/api/lanes",{method:"GET"})
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
        <AuthContext.Provider value={{isLogged,setIsLogged,lanes,setLanes,admin,setAdmin}}>
            <NavigationContainer>
                {
                    isLogged === true ? <Application /> : <Auth />
                }
            </NavigationContainer>
        </AuthContext.Provider>
    );
}

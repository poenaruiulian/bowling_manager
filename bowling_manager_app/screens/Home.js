import {View, Text, TouchableOpacity, Image} from "react-native";
import {styles} from "../styles/styles";
import {getData, getUser, setData} from "../helpers/asyncStorageFunctions";
import {useNavigation} from "@react-navigation/native";
import {AuthContext} from "../context/AuthContext";
import {useContext, useState} from "react";
import KSpacer from "../components/kSpacer";

export default function Home(){
    const navigator = useNavigation();
    const {isLogged, setIsLogged} = useContext(AuthContext)
    const [username,setUsername] = useState("")
    const get = async()=>{
        await getUser().then(res=>{
            setUsername(res)
        })
    }
    get();
    return (
        <View style={styles.container}>
            <KSpacer height={50}/>
                <View style={styles.header}>
                    <Text style={{fontSize:30}}>{username}</Text>
                    <TouchableOpacity
                        onPress={()=>{
                            setData("isLogged",'false');
                            setIsLogged(false)

                        }}
                    >
                        <Image source={require("../styles/icons/logout.png")} style={{height:30,width:30}}/>
                    </TouchableOpacity>
                </View>
        </View>
    )
}
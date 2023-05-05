import {View, Text, TouchableOpacity, Image, FlatList} from "react-native";
import {styles} from "../styles/styles";
import {getData, getUser, setData} from "../helpers/asyncStorageFunctions";
import {useNavigation} from "@react-navigation/native";
import {AuthContext} from "../context/AuthContext";
import {useContext, useEffect, useState} from "react";
import KSpacer from "../components/kSpacer";
import KLane from "../components/kLane";

export default function Home(){
    const navigator = useNavigation();

    const {isLogged, setIsLogged} = useContext(AuthContext)
    const {lanes, setLanes} = useContext(AuthContext)
    const {admin, setAdmin} = useContext(AuthContext)

    const [numberOfLanes, setNumberOfLanes] = useState(0)
    const [username,setUsername] = useState("")
    const get = async()=>{
        await getUser().then(res=>{
            setUsername(res)
        })
    }
    get()
    return (
        <View style={styles.container}>
            <KSpacer height={20}/>
            <View style={styles.header}>
                {
                    admin?
                        <Text style={{fontSize:30,color:"red"}}>{username}</Text>
                        :
                        <Text style={{fontSize:30}}>{username}</Text>
                }

                <TouchableOpacity
                    onPress={()=>{
                        setData("isLogged",'false');
                        setIsLogged(false)
                        if(admin){
                            setAdmin(false)
                            setData("admin","false")
                        }
                    }}
                >
                    <Image source={require("../styles/icons/logout.png")} style={{height:30,width:30}}/>
                </TouchableOpacity>
            </View>
            <FlatList
                style={{width:"100%"}}
                data={lanes}
                renderItem={({item}) =>

                    <View>
                        <KLane players={item.players} start={item.start} available={item.available} number={lanes.findIndex(i=>i===item)+1}/>
                        <KSpacer height={20}/>
                    </View>
            }
            />
        </View>
    )
}
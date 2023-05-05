import {View, Text, TouchableOpacity, Image, FlatList, TextInput} from "react-native";
import {styles} from "../styles/styles";
import KSpacer from "../components/kSpacer";
import {useContext, useState} from "react";
import KPlayer from "../components/kPlayer";
import {ip} from "../ipConfig";
import {AuthContext} from "../context/AuthContext";
import {useNavigation} from "@react-navigation/native";

export default function AddPlayers({route}){
    const [players, setPlayers] = useState([])
    const [onePlayer, setOnePlayer] = useState("")
    const {setLanes} = useContext(AuthContext)
    const navigator = useNavigation()
    return(
        <View style={styles.container}>
            <KSpacer height={20}/>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={()=>navigator.goBack()}
                >
                    <Image source={require("../styles/icons/return.png")} style={{height:30,width:30}}/>
                </TouchableOpacity>
                <Text style={{fontSize:30}}>Lane {route.params.number}</Text>
            </View>
            <View style={{width:"80%",flexDirection:"row",justifyContent:"space-between"}}>
                <TextInput
                    style={[styles.inputText,{width:"60%"}]}
                    value={onePlayer}
                    textAlign={"center"}
                    placeholder={"Player name..."}
                    onChangeText={text=>setOnePlayer(text)}
                />
                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=>{
                        if(players.length == 6){
                            alert("Can't add more players!");
                            setOnePlayer("")
                        }else if(onePlayer!=""){
                            setPlayers( [...players,onePlayer]);
                            setOnePlayer("");
                        }

                    }
                    }
                >
                    <Text>Add</Text>
                </TouchableOpacity>
            </View>
            <KSpacer height={20}/>
            <FlatList showsVerticalScrollIndicator={false} style={{flexGrow:0,height:"65%"}} contentContainerStyle={{width:"80%",alignItems:"left"}} data={players} renderItem={({item})=>
                <View>
                    <KPlayer name={item}/>
                    <KSpacer height={20}/>
                </View>
            }/>
            <TouchableOpacity
                style={styles.btn}
                onPress={async ()=>{
                    await fetch("http://"+ip+":1337/api/lanes/"+route.params.number,{
                        method:"PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body:JSON.stringify({
                            "data":
                                {
                                    "players":players,
                                    "start":new Date(),
                                    "available":false
                                }
                        })
                    }).then(resp=>resp.json()).then(res=>console.log(res))
                        .catch(err=>console.log(err))

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
                            navigator.goBack();
                            alert("New session started on Lane "+route.params.number+"!")
                        })
                }
                }
            >
                <Text style={styles.btnTxt}>Start session!</Text>
            </TouchableOpacity>
        </View>
    )
}
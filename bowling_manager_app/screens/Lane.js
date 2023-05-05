import {View, Text, Image, TouchableOpacity, FlatList} from "react-native";
import KSpacer from "../components/kSpacer";
import {styles} from "../styles/styles";
import {setData} from "../helpers/asyncStorageFunctions";
import {useNavigation} from "@react-navigation/native";
import KPlayer from "../components/kPlayer";
import {getTime} from "../components/kLane";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {ip} from "../ipConfig";
import axios from "axios";
function getPrice(start){
    // presupunem ca nimeni nu sta 24 de ore sa joace
    const startDate = new Date(start);
    const endDate = new Date();
    // 60 min - 30 RON => 2min=1RON
    let minutes = endDate.getMinutes() - startDate.getMinutes();
    let hours = endDate.getHours();
    if(minutes < 0){
        hours = hours - 1;
        minutes= 60 + minutes;
    }
    hours = hours-startDate.getHours();
    let price = (minutes + hours*60)/2
    return price;
}

export default function Lane({route}){
    const navigator = useNavigation();
    const {admin} = useContext(AuthContext)
    const {lanes, setLanes} = useContext(AuthContext)
    return (
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
            <KSpacer height={20}/>
            {
                route.params.available == true ?
                    <View style={[styles.laneScreenDescription, {justifyContent:"center"}]}>
                        <Image source={require("../styles/images/available_bowling.png")} style={{height:100,width:100}}/>
                        <KSpacer height={30}/>
                        <Text style={{fontSize:20, color:"white"}}>This lane is available. Contact a staff member to let you play. Have fun!</Text>
                    </View>
                    :
                    <View style={styles.laneScreenDescription}>
                        <View style={{width:"100%",alignItems:"left"}}>
                            <Text style={{fontSize:20}}>Starting time: <Text style={{color:"white"}}>{getTime(route.params.start)}</Text></Text>
                            <KSpacer height={10}/>
                            <Text style={{fontSize:20}} >Price at the moment: <Text style={{color:"white"}}>{getPrice(route.params.start)} RON</Text></Text>
                            <KSpacer height={10}/>
                            <Text style={{fontSize:20}}>Players:</Text>
                        </View>
                        <KSpacer height={10}/>
                        <FlatList showsVerticalScrollIndicator={false} style={{height:"65%", flexGrow:0}} contentContainerStyle={{width:"80%",alignItems:"left"}}data={route.params.players} renderItem={({item})=>
                            <View>
                                <KPlayer name={item}/>
                                <KSpacer height={20}/>
                            </View>
                        }/>
                        <KSpacer height={10}/>
                        {
                            admin?
                                <TouchableOpacity
                                    style={{
                                        backgroundColor:"#E76161",
                                        padding:10,
                                        borderRadius:10
                                    }}
                                    onPress={ async ()=>{

                                        await fetch('http://'+ip+':1337/api/lanes/'+route.params.number,{
                                            method:"PUT",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body:JSON.stringify({
                                                "data":
                                                    {
                                                        "players":null,
                                                        "start":null,
                                                        "available":true
                                                    }
                                                }),
                                        }).then(response=>response.json()).then(res=>console.log(res))
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
                                            })
                                        navigator.goBack()
                                        alert("Session on Lane" + route.params.number + " ended!")
                                    }}
                                >
                                    <Text style={{fontSize:15,fontWeight:"bold"}}>Stop session!</Text>
                                </TouchableOpacity>
                                :
                                <Text></Text>
                        }
                    </View>
            }
        </View>
    )
}
import {View, Text, Image, TouchableOpacity, FlatList} from "react-native";
import KSpacer from "../components/kSpacer";
import {styles} from "../styles/styles";
import {setData} from "../helpers/asyncStorageFunctions";
import {useNavigation} from "@react-navigation/native";
import KPlayer from "../components/kPlayer";
import {getTime} from "../components/kLane";
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
                            <Text style={{fontSize:20}} >Price at the moment (/h): <Text style={{color:"white"}}>{getPrice(route.params.start)} RON</Text></Text>
                            <KSpacer height={10}/>
                            <Text style={{fontSize:20}}>Players:</Text>
                        </View>
                        <KSpacer height={10}/>
                        <FlatList contentContainerStyle={{width:"80%",alignItems:"left",height:"100%"}}data={route.params.players} renderItem={({item})=>
                            <View>
                                <KPlayer name={item}/>
                                <KSpacer height={20}/>
                            </View>
                        }/>
                    </View>
            }
        </View>
    )
}
import {View, Text, TouchableOpacity, Image} from "react-native";
import {useState} from "react";
import {styles} from "../styles/styles";
import {useNavigation} from "@react-navigation/native";

export function getTime(start){
    const date = new Date(start);
    let result =
        String(date.getDate())+"-"+
        String(date.getMonth()+1)+"-"+
        String(date.getFullYear())+" "+
        String(date.getHours())+":"+
        String(date.getMinutes())
    return result;
}
export default function KLane({players,start,available,number}){
    const [laneImage,setLaneImage] = useState([
        require("../styles/images/lane0.jpg"),
        require("../styles/images/lane1.jpg"),
        require("../styles/images/lane2.jpg"),
        require("../styles/images/lane3.jpg"),
        require("../styles/images/lane4.jpg"),
        require("../styles/images/lane5.jpg"),
    ])
    const navigator = useNavigation()
    return (
        <TouchableOpacity
            onPress={()=>navigator.navigate("Lane",{
                number:number,
                players:players,
                available:available,
                start:start
            })}
            style={styles.laneContainer}>
            <Image style={styles.laneImage} source={laneImage[number-1]}/>
            <View style={styles.laneNumber}>
                <Text style={{fontSize:30, fontWeight:"bold",color:"white"}}>Lane {number}</Text>
            </View>
            <View style={styles.laneDescription}>
                {
                    available!=true?
                        <View>
                            <Text style={styles.laneText}>Starting time: <Text style={{color:"white"}}>{getTime(start)}</Text></Text>
                            <Text style={styles.laneText}>No. of players:<Text style={{color:"white"}}> {players.length}</Text></Text>
                        </View>
                        :
                        <View>
                            <Text style={styles.laneTextAvlb}>A V A I L A B L E</Text>
                        </View>
                }
            </View>
        </TouchableOpacity>
    )
}
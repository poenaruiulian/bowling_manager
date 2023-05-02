import {View, Text, Image} from "react-native";
import {styles} from "../styles/styles";

export default function KPlayer(name){
    return (
        <View style={styles.playerContainer}>
            <Image style={{height:50,width:50}} source={require("../styles/images/bowling.png")}/>
            <View style={{height:50,justifyContent:"center"}}>
                <Text style={{fontSize:20, fontWeight:"bold",color:"white"}}>{name.name}</Text>
            </View>
        </View>
    )
}
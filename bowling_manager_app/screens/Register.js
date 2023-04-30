import {View, Text, TextInput, TouchableOpacity} from "react-native";
import {styles} from "../styles/styles";
import {useNavigation} from "@react-navigation/native";

export default function Register(){
    const navigator = useNavigation();
    return(
        <View style = {[styles.container, {
            justifyContent:"center",
            flexDirection:"column",
            gap:"20"
        }]}>
            <TextInput
                placeholder={"Username"}
                style={styles.inputText}
                textAlign={"center"}

            />
            <TextInput
                placeholder={"Mail"}
                style={styles.inputText}
                textAlign={"center"}

            />
            <TextInput
                placeholder={"Password"}
                style={styles.inputText}
                textAlign={"center"}

            />
            <TouchableOpacity
                style={styles.btn}
                //todo same as in login
            >
                <Text style={styles.btnTxt}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=>{navigator.goBack()}}
            >
                <Text  style={{color:"blue"}}>Account? Login</Text>
            </TouchableOpacity>
        </View>
    )
}
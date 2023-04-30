import {View, Text, TextInput, TouchableOpacity} from "react-native";
import {styles} from "../styles/styles";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import axios from 'axios';

import {getData, setData} from "../helpers/asyncStorageFunctions";

export default function Login(){
    const [email, setEmail] =useState("")
    const [password, setPassword] = useState("")
    const navigator = useNavigation();
    return(
        <View style = {[styles.container, {
            justifyContent:"center",
            flexDirection:"column",
            gap:"20"
        }]}>
            <TextInput
                placeholder={"Email"}
                style={styles.inputText}
                textAlign={"center"}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                placeholder={"Password"}
                style={styles.inputText}
                textAlign={"center"}
                onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity
                style={styles.btn}
                onPress={()=> {
                    console.log(email, password)
                    axios
                        .post('http://192.168.100.26:3000/api/auth/local', {
                            identifier:email,
                            password:password
                        })
                        .then(response => {
                            setData("user",response.data.user.username)
                            setData("isLogged","true")
                            //todo method to go to home but no coming back only with logout maybe listners?
                            navigator.dispatch()
                        })
                        .catch(error => {
                            console.log('An error occurred:', error.response);
                        });
                }}
            >
                <Text style={styles.btnTxt}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=>{navigator.navigate("Register")}}
            >
                <Text  style={{color:"blue"}}>No account? Register</Text>
            </TouchableOpacity>
        </View>
    )
}
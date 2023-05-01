import {View, Text, TextInput, TouchableOpacity} from "react-native";
import {styles} from "../styles/styles";
import {useContext, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import axios from 'axios';

import {getData, setData} from "../helpers/asyncStorageFunctions";
import {AuthContext} from "../context/AuthContext";

export default function Login(){
    const [email, setEmail] =useState("")
    const [password, setPassword] = useState("")
    const navigator = useNavigation();

    const {isLogged,setIsLogged} = useContext(AuthContext)

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
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity
                disabled={!(password !== "" && email !== "")}
                style={styles.btn}
                onPress={()=> {
                    console.log(email, password)
                    axios
                        .post('http://192.168.100.26:1337/api/auth/local', {
                            identifier:email,
                            password:password
                        })
                        .then(response => {
                            console.log(response.data.user.username)
                            setData("user",response.data.user.username)
                            setData("isLogged","true")
                            setIsLogged(true)
                        })
                        .catch(error => {
                            alert("Something went wrong...Verify password/email!")
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
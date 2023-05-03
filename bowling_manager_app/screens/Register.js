import {View, Text, TextInput, TouchableOpacity, Image} from "react-native";
import {styles} from "../styles/styles";
import {useNavigation} from "@react-navigation/native";
import {useContext, useState} from "react";
import axios from 'axios';
import {AuthContext} from "../context/AuthContext";
import {setData} from "../helpers/asyncStorageFunctions";
import {ip} from "../ipConfig"

export default function Register(){
    const navigator = useNavigation();

    const [username, setUsername] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("")

    const {isLogged, setIsLogged} = useContext(AuthContext)

    return(
        <View style = {[styles.container, {
            justifyContent:"center",
            flexDirection:"column",
            gap:"20"
        }]}>
            <Image source={require("../styles/images/available_bowling.png")} style={{height:100,width:100}}/>
            <TextInput
                placeholder={"Username"}
                style={styles.inputText}
                textAlign={"center"}
                onChangeText={text => setUsername(text)}

            />
            <TextInput
                placeholder={"Mail"}
                style={styles.inputText}
                textAlign={"center"}
                onChangeText={text=>setMail(text)}

            />
            <TextInput
                placeholder={"Password"}
                style={styles.inputText}
                textAlign={"center"}
                secureTextEntry={true}
                onChangeText={text=>setPassword((text))}

            />
            <TouchableOpacity
                disabled={!(username !== "" && password !== "" && mail !== "")}
                style={styles.btn}
                onPress={()=>{
                    axios
                        .post('http://'+ip+':1337/api/auth/local/register', {
                            username: username,
                            email: mail,
                            password: password,
                        })
                        .then(response => {
                            setIsLogged(true)
                            setData("user",response.data.user.username)
                            setData("isLogged",'true')
                        })
                        .catch(error => {
                            alert("Email or Username are already taken")
                        });
                }
                }
            >
                <Text style={styles.btnTxt}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=>{navigator.goBack()}}
            >
                <Text  style={{color:"#212A3E"}}>Account? Login</Text>
            </TouchableOpacity>
        </View>
    )
}
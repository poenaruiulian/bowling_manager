import {View, Text, TextInput, TouchableOpacity} from "react-native";
import {styles} from "../styles/styles";
import {useNavigation} from "@react-navigation/native";
import {useContext, useState} from "react";
import axios from 'axios';
import {AuthContext} from "../context/AuthContext";
import {setData} from "../helpers/asyncStorageFunctions";

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
                        .post('http://192.168.100.26:1337/api/auth/local/register', {
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
                <Text  style={{color:"blue"}}>Account? Login</Text>
            </TouchableOpacity>
        </View>
    )
}
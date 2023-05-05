import {View, Text, TextInput, Image, TouchableOpacity} from "react-native";
import {styles} from "../styles/styles";
import axios from "axios";
import {ip} from "../ipConfig";
import {setData} from "../helpers/asyncStorageFunctions";
import {AuthContext} from "../context/AuthContext";
import {useContext, useState} from "react";
export default function AdminLogin() {
    const [email, setEmail] =useState("")
    const [password, setPassword] = useState("")

    const {isLogged,setIsLogged,admin,setAdmin} = useContext(AuthContext)
    return (
        <View style={[styles.container, {
            justifyContent: "center",
            flexDirection: "column",
            gap: "20"
        }]}>
            <Image source={require("../styles/icons/admin.png")} style={{height: 100, width: 100}}/>
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
                        .post('http://'+ip+':1337/api/auth/local', {
                            identifier:email,
                            password:password
                        })
                        .then(response => {
                            console.log(response.data.user.username)
                            setData("user",response.data.user.username)
                            setData("isLogged","true")
                            setData("admin","true")
                            setAdmin(true)
                            setIsLogged(true)
                        })
                        .catch(error => {
                            alert("Something went wrong...Verify password/email!")
                        });
                }}
            >
                <Text style={styles.btnTxt}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}
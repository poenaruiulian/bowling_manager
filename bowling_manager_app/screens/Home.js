import {View, Text, TouchableOpacity} from "react-native";
import {styles} from "../styles/styles";
import {setData} from "../helpers/asyncStorageFunctions";
import {useNavigation} from "@react-navigation/native";

export default function Home(){
    const navigator = useNavigation();
    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <TouchableOpacity
                onPress={()=>{
                    setData("isLogged",'false');
                    //todo go back to login

                }}
            >
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}
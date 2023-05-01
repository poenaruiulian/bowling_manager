import {View, Text} from "react-native";

export default function KSpacer({height}){
    return(
        <View style={{height:height}}>
            <Text> </Text>
        </View>
    )
}
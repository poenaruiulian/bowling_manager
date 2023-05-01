import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",

    },

    inputText:{
        height:40,
        width:"80%",
        backgroundColor:"white",
        borderRadius:10
    },

    btn:{
        height:40,
        width:"30%",
        backgroundColor:"orange",
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center"
    },

    btnTxt:{
        fontWeight:"bold",
        color:"white"
    },

    header:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between",
        padding:20
    }
})

export {styles};
import {StyleSheet} from "react-native";

// #F1F6F9 --> input text/ things to highlight
// #394867 --> screen background
// #212A3E --> unimportant things
// #9BA4B5 --> text box
// #41644A--> available text

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        backgroundColor:"#394867"
    },

    inputText:{
        height:40,
        width:"80%",
        backgroundColor:"#F1F6F9",
        borderRadius:10
    },

    btn:{
        height:40,
        width:"30%",
        backgroundColor:"#9BA4B5",
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
    },

    laneImage:{
        width:"90%",
        height:"75%",
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
    },

    laneContainer:{
        width:"100%",
        height:150,
        alignItems:"center"
    },
    //this below is a bad way of putting text above an image
    laneNumber:{
        position: 'absolute',
        top: 0,
        left: 30,
        right: 0,
        bottom: -30,
        justifyContent: 'center',
        alignItems: 'left'
    },
    laneDescription:{
        backgroundColor:"#9BA4B5",
        height:"25%",
        width:"90%",
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        alignItems:"center",
        justifyContent:"center"
    },
    laneText:{
        fontWeight:"bold",
        color:"#394867"
    },
    laneTextAvlb:{
        fontWeight:"bold",
        fontSize:20,
        color:"#41644A"
    },
    laneScreenDescription:{
        width:"90%",
        alignItems:"center"
    },
    playerContainer:{
        width:"100%",
        flexDirection:"row",
        gap:20
    },
})

export {styles};
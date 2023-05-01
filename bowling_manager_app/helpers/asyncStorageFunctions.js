import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async (key) => { // keys:["isLogged","user"]
    const response = await AsyncStorage.getItem(key);
    console.log("--",response)
    return response != null ? JSON.parse(response) : undefined;
}
const setData = async (key,value) => {
    return AsyncStorage.setItem(key,value);
}

const getUser = async()=>{
    const response = await AsyncStorage.getItem("user");
    return response
}

export {getData,setData, getUser}
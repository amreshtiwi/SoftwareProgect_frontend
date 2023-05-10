import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "./apiManager";

export const createPost = async (data) => {
    try{
        const uri = "/posts";
        const token = await AsyncStorage.getItem("AccessToken");
        const result = await ApiManager(uri,{
            method: "POST",
            headers:{
                "content-type": "application/json",
                "Authorization":'Bearer '+ token,
            },
            data:data
        })
        return result;
    }catch (err){
        return err.response.data;
    }
}
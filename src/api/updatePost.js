import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "./apiManager";

export const updatePost = async (data,userId) => {
    try{
        const uri = "/posts/"+userId;
        const token = await AsyncStorage.getItem("AccessToken");
        const result = await ApiManager(uri,{
            method: "PUT",
            headers:{
                "content-type": "application/json",
                "Authorization":'Bearer '+ token,
            },
            data:data
        })
        console.log(result.data);
        return result;
    }catch (err){
        return err.response.data;
    }
}
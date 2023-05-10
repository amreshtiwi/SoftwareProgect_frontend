import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "./apiManager";

export const updateUserApi = async (data,userId) => {
    try{
        const uri = "/users/"+userId;
        const token = await AsyncStorage.getItem("AccessToken");
        const result = await ApiManager(uri,{
            method: "PUT",
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
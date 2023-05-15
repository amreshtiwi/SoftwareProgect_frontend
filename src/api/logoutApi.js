import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "./apiManager";

export const logoutApi = async () => {
    try{
        const uri = "/users/logout";
        const token = await AsyncStorage.getItem("AccessToken");
        const result = await ApiManager(uri,{
            method: "POST",
            headers:{
                "content-type": "application/json",
                "Authorization":'Bearer '+ token,
            },
        })
        return result;
    }catch (err){
        return err.response.data;
    }
}
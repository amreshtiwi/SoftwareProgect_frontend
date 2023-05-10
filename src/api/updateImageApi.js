import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "./apiManager";

export const updateUserImage = async (data,userId) => {
    try{
        // console.log('data APi'.data);
        const uri = "/users/profileImage/"+userId;
        const token = await AsyncStorage.getItem("AccessToken");
        const result = await ApiManager(uri,{
            method: "PUT",
            headers:{
                "Content-Type": "multipart/form-data",
                "Authorization":'Bearer '+ token,
            },
            data:data
        })
        return result;
    }catch (err){
        console.log('here err image');
        return err.response.data;
    }
}
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "./apiManager";

export const createBooking = async (data) => {
    try{
        const uri = "/users/bookings";
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
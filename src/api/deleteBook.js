import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "./apiManager";

export const deleteBook = async bookId => {
    try{
        const uri = "/users/bookings/"+bookId;
        const token = await AsyncStorage.getItem("AccessToken");
        const result = await ApiManager(uri,{
            method: "DELETE",
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
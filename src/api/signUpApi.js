import ApiManager from "./apiManager";

export const signUpApi = async data => {
    try{
        const result = await ApiManager("/users/register",{
            method: "POST",
            headers:{
                "Content-Type": "multipart/form-data",
            },
            data:data
        })
        return result;
    }catch (err){
        return err.response.data;
    }
}
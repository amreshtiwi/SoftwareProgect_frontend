import ApiManager from "./apiManager";

export const loginApi = async data => {
    try{
        const result = await ApiManager("/users/login",{
            method: "POST",
            headers:{
                "content-type": "application/json"
            },
            data:data
        })
        return result;
    }catch (err){
        return err.response.data;
    }
}


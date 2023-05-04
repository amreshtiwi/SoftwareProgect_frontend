import ApiManager from "./apiManager";

export const maritalApi = async params => {
    try{
        const result = await ApiManager("/enums/ar_marital_statuses",{
            method: "GET",
            headers:{
                "content-type": "application/json"
            },
            params:params,
        })
        return result;
    }catch (err){
        return err.response.data;
    }
}


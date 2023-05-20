import React, { useState } from "react";
// import {
//   Dimensions,
//   KeyboardAvoidingView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
import ExcutionRequset from "../Component/transactions/excutionRequset";
import { Text, View } from "react-native";
import ReleaseCar from "../Component/transactions/releaseCar";
import ReceiptPayment from "../Component/transactions/receiptPayment";
import ReserveCar from "../Component/transactions/reserveCar";
import LeaveClaim from "../Component/transactions/leaveClaim";
import ReNotify from "../Component/transactions/re-notify";
import ReserveBank from "../Component/transactions/reserveBank";
import DententionRequest from "../Component/transactions/detentionRequest";
import ReferralMedicalComitte from "../Component/transactions/referralMedicalComiitee";


function CreateTransactionPage({ navigation, route, user }) {
  const { type } = route.params;
  
    
    if(type === 'طلب تنفيذ'){
     return(<ExcutionRequset navigation={navigation} route={route} user={user}></ExcutionRequset>);
    }else if(type === 'فك حجز مركبة'){
      return (<ReleaseCar navigation={navigation} route={route} user={user}></ReleaseCar>) 
    }else if(type === 'طلب إقرار إستلام دفعة'){
      return(<ReceiptPayment navigation={navigation} route={route} user={user}></ReceiptPayment>)
    }else if(type === 'حجز مركبة'){
      return(<ReserveCar navigation={navigation} route={route} user={user}></ReserveCar>)
    }else if(type === 'طلب ترك دعوى'){
      return (<LeaveClaim navigation={navigation} route={route} user={user}></LeaveClaim>)
    }else if(type === 'إعادة تبليغ'){
      return(<ReNotify navigation={navigation} route={route} user={user}></ReNotify>)
    }else if(type === 'طلب حجز بنوك'){
      return (<ReserveBank navigation={navigation} route={route} user={user}></ReserveBank>)
    }else if(type === 'طلب حبس'){
      return (<DententionRequest navigation={navigation} route={route} user={user} ></DententionRequest>)
    }else if(type === "إحالة للجنة الطبية"){
      return(<ReferralMedicalComitte navigation={navigation} route={route} user={user}></ReferralMedicalComitte>)
    }
    
  
};
export default CreateTransactionPage;

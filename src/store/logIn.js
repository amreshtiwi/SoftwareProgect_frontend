import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginApi } from "../api/loginApi";
import { auth } from "./firebase";

const logIn = async (data) => {
  //login in our server
  loginApi({
    email: data.email.toLocaleLowerCase(),
    password: data.password,
  })
    .then((result) => {
      if (result.status == 200) {
        AsyncStorage.setItem("userID", result.data.id.toString());

        console.log("userID app.js : ", result.data.id.toString());

        AsyncStorage.setItem("AccessToken", result.data.token);
      } else {
        console.log("problem in log in afetr regester");
      }
    })
    .catch((err) => {
      console.error(err);
    });

    //login to firebase server
  auth.signInWithEmailAndPassword(data.email, data.password).catch((error) => {
    // var errorCode = error.code;
    var errorMessage = error.message;
    console.log("login firebase:", errorMessage);
  });
};

export default logIn;

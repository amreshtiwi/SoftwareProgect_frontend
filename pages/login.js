import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
} from "react-native";
import Colors from "../src/color";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

function LoginPage() {
  function signUpHandler() {
    console.log("SignUp");
  }
  return (
    <SafeAreaView style={styles.loginPage}>
      <View style={styles.infoSignUp}>
        <Pressable onPress={signUpHandler} style={styles.signUPBtn}>
          <Text style={styles.SignUpTxt}>إنشاء حساب</Text>
        </Pressable>

        <Pressable>
          <Ionicons
            name="information-circle-outline"
            size={24}
            color={Colors.black}
          />
        </Pressable>
      </View>

      <Image
        style={{ width: 300, height: 300 }}
        source={require("../assets/logoWithTitle.png")}
      />

      <View style={styles.signIn}>
        <Text style={styles.text}>البريد الإلكتروني أو رقم الهاتف</Text>
        <TextInput style={styles.emailInput} />
        <Text style={styles.text}>كلمة المرور</Text>
        <TextInput style={styles.emailInput} secureTextEntry={true} />
      </View>
      <Pressable>
        <Text>نسيت كلمة المرور؟</Text>
      </Pressable>
      <Pressable
        onPress={signUpHandler}
        style={[styles.signUPBtn, { width: "100%", marginTop: 10 }]}
      >
        <Text style={styles.SignUpTxt}>تسجيل الدخول</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loginPage: {
    marginVertical: 50,
    marginHorizontal: 20,
    flex: 1,
    alignItems: "center",
  },
  signUPBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    padding: 10,
    backgroundColor: Colors.darkGreen,
    borderRadius: 15,
  },
  SignUpTxt: {
    color: Colors.lightVanilla,
  },
  infoSignUp: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  emailInput: {
    height: 40,
    borderWidth: 1,
    backgroundColor: Colors.darkVanilla,
    padding: 10,
    borderRadius: 15,
    width: "100%",
    marginBottom: 10,
  },
  signIn: {
    width: "100%",
  },
  text: {
    marginBottom: 2,
    marginHorizontal: 10,
  },
});
export default LoginPage;

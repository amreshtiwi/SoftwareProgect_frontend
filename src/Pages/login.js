import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  I18nManager,
} from "react-native";
import Colors from "../color";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import { useContext, useState } from "react";
import { loginApi } from "../api/loginApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import App, { AuthContext } from "../../App";

I18nManager.forceRTL(true);
function LoginPage({ navigation }) {

  const [passwordVisible, setPasswordVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { authContext , loginCaution} = useContext(AuthContext);

  function signUpNavigation() {
    navigation.navigate("signUp");
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.loginPage}>
        <View style={[styles.infoSignUp, { justifyContent: "space-between" }]}>
          <Pressable
            onPress={signUpNavigation}
            style={[
              styles.Btn,
              { width: "50%", backgroundColor: Colors.yellow },
            ]}
          >
            <Text style={[styles.btnTxt, { color: Colors.black }]}>
              إنشاء حساب
            </Text>
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
          source={require("frontend/assets/logoWithTitle.png")}
        />

        <View style={styles.signIn}>
          <TextInput
            style={styles.input}
            value={email}
            label="البريد الإلكتروني أو رقم الهاتف"
            mode="outlined"
            selectionColor={Colors.darkGreen}
            outlineColor={Colors.darkGreen}
            activeOutlineColor={Colors.darkGreen}
            onChangeText={(email) => {
              setEmail(email);
            }}
          />

          <TextInput
            style={styles.input}
            value={password}
            label="كلمة السر"
            secureTextEntry={passwordVisible}
            mode="outlined"
            selectionColor={Colors.darkGreen}
            outlineColor={Colors.darkGreen}
            activeOutlineColor={Colors.darkGreen}
            right={
              <TextInput.Icon
                icon={passwordVisible ? "eye" : "eye-off"}
                onPress={() => {
                  setPasswordVisible(!passwordVisible);
                }}
                color={Colors.darkGreen}
              />
            }
            onChangeText={(password) => {
              setPassword(password);
            }}
          />
        </View>
        {console.log(loginCaution)}
        {loginCaution  ? (
          <Text style={{ color: Colors.red }}>
            كلمة المرور أو البريد الإلكتروني غير صحيحة
          </Text>
        ) : (
          <View></View>
        )}
        <View style={styles.infoSignUp}>
          <Pressable>
            <Text>نسيت كلمة المرور؟ ,</Text>
          </Pressable>
          <Pressable>
            <Text>ليس لدي حساب</Text>
          </Pressable>
        </View>
        <Pressable
          onPress={() => authContext.signIn({ email, password })}
          style={[
            styles.Btn,
            { width: "100%", marginTop: 10, backgroundColor: Colors.darkGreen },
          ]}
        >
          <Text style={styles.btnTxt}>تسجيل الدخول</Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  loginPage: {
    marginVertical: 50,
    marginHorizontal: 20,
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.lightVanilla,
  },
  Btn: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 15,
  },
  btnTxt: {
    color: Colors.lightVanilla,
    fontWeight: "bold",
  },
  infoSignUp: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    backgroundColor: Colors.lightVanilla1,
    marginVertical: 5,
    borderRadius: 10,
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

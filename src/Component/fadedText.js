import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native";
import Colors from "../color";

const FadedText = ({ text, numberOfLines }) => {
    return (
      <>
        <LinearGradient
          colors={["transparent", Colors.lightVanilla1]}
          style={{ flex: 1 }}
        >
          <Text numberOfLines={numberOfLines} style={{ fontSize: 14 }}>
            {text}
          </Text>
          <LinearGradient
            colors={["rgba(255, 255, 255, 0)", Colors.lightVanilla1]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "100%",
            }}
          />
        </LinearGradient>
      </>
    );
  };

  export default FadedText;
import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "../color";

const Comment = ({image,commentValue}) => {
return(
    <View style={styles.commentContainer}>
    <Image
      source={require("../../assets/user.png")}
      style={styles.commentImage}
    />
    <View style={styles.comentTextContainer}>
        <Text style={styles.commentName}>عمرو شتيوي</Text>
      <Text style={styles.commentText}>الكثير من الأوراق والكثير من البيانات والكثير من الصور والكثير من الشروط</Text>
    </View>
  </View>
);
} 

const styles = StyleSheet.create({
    commentContainer:{
        flexDirection:'row',
        width:'100%',
        marginVertical:10,
      },
      commentImage:{
        width: 25,
        height: 25,
        borderRadius: 30,
      },
      comentTextContainer:{
        backgroundColor:Colors.lightVanilla1,
        width:'90%',
        borderRadius:20,
        padding:5
      },
      commentText:{
        paddingHorizontal:10,
        fontSize:14,
      },
      commentName:{
        paddingHorizontal:5,
        marginBottom:5,
        fontWeight:'bold'
      }
});

export default Comment;
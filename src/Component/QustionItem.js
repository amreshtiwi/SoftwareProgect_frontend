import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../color";
import { Divider } from "react-native-paper";

function QuestionItem({ item }) {
  const [linesOfAnswer, setLinesOfAnswer] = useState(2);

  const showAnswer = () => {
    if (linesOfAnswer === 2) {
      setLinesOfAnswer(0);
    } else {
      setLinesOfAnswer(2);
    }
  };
  return (
    <TouchableOpacity onPress={showAnswer} style={styles.itemContainer}>
      <Text style={styles.questionText}>{item.question}</Text>
      <Divider bold={true} style={{ backgroundColor:Colors.darkGreen}}/>
      <Text numberOfLines={linesOfAnswer} style={styles.answerText}>
        {item.answer}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

    itemContainer: {
      marginBottom: 16,
      padding: 16,
      backgroundColor: Colors.lightVanilla1,
      borderRadius: 20,
      width: "95%",
      elevation:5
    },
    questionText: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 8,
    },
    answerText: {
      fontSize: 14,
    },
  });
export default QuestionItem;

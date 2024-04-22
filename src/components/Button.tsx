import React from "react";
import { Text, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

interface Props {
  title: string;
  onPress: () => void;
}

const Button = ({ title, onPress = () => {} }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        width: "100%",
        height: 55,
        backgroundColor: Colors.primaryColor,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20,
      }}
    >
      <Text style={{ color: Colors.white, fontSize: 18, fontWeight: "bold" }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

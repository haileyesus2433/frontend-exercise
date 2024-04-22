import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TextProps,
  TextInputProps,
} from "react-native";
import React, { useState } from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Colors from "../constants/Colors";

interface Props extends TextInputProps {
  label: string;
  iconName: any;
  error?: string;
  password?: boolean;
  onFocusHandler: () => void;
  onChangeHandler: (value: string) => void;
}

const Input = ({
  label,
  iconName,
  error,
  password,
  onFocusHandler = () => {},
  onChangeHandler,
  placeholder,
  value,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(password);

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error
              ? "crimson"
              : isFocused
              ? Colors.black
              : Colors.white,
          },
        ]}
      >
        <Icon
          name={iconName}
          style={{ fontSize: 22, color: Colors.black, marginRight: 10 }}
        />
        <TextInput
          value={value}
          onChangeText={onChangeHandler}
          secureTextEntry={hidePassword}
          onFocus={() => {
            onFocusHandler();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          autoCorrect={false}
          style={{ color: Colors.black, flex: 1 }}
          placeholder={placeholder}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword((prevValue) => !prevValue)}
            style={{ fontSize: 22, color: Colors.black }}
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
          />
        )}
      </View>
      {error && (
        <Text style={{ color: "crimson", fontSize: 12, marginTop: 7 }}>
          {error}
        </Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: Colors.black,
  },
  inputContainer: {
    height: 55,
    backgroundColor: Colors.bgColor,
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 1.5,
    borderRadius: 5,
    alignItems: "center",
    // backg: "none",
  },
});
export default Input;

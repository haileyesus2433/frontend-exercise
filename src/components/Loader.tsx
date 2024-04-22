import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React from "react";
import Colors from "../constants/Colors";

const Loader = () => {
  const { height, width } = useWindowDimensions();
  return (
    <View style={[styles.container, { height, width }]}>
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
        <Text style={{ marginLeft: 15, fontSize: 18 }}>Loading...</Text>
      </View>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 100,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
  },
  loader: {
    height: 70,
    backgroundColor: Colors.white,
    marginHorizontal: 50,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

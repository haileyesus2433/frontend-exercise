import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import Colors from "../../constants/Colors";
import UserListItem from "../../components/UserListItem";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../types";
import Loader from "../../components/Loader";
import { logout } from "../../redux/slices/authSlice";

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: IState) => state.auth);
  const logoutHandler = () => {
    dispatch(logout({}));
    if (!error && !isLoading) {
      router.replace("/(auth)/login");
    }
  };

  if (isLoading) return <Loader />;
  if (error) alert(error || "Something went wrong try again");
  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
        }}
      />
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Users</Text>

          <TouchableOpacity
            onPress={logoutHandler}
            activeOpacity={0.7}
            style={{
              height: 55,
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 10,
            }}
          >
            <Text style={styles.headingLogout}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingBottom: 80 }}>
          <UserListItem />
        </View>
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "10%",
    paddingHorizontal: 20,
    backgroundColor: Colors.bgColor,
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headingLogout: {
    fontSize: 20,
    color: Colors.primaryColor,
    fontWeight: "600",
  },
  headingText: {
    fontSize: 30,
    fontWeight: "700",
    color: Colors.black,
    marginTop: 10,
  },
});

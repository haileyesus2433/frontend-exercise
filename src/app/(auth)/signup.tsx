import React from "react";
import { Stack } from "expo-router";
import SignupEditProfile from "../../components/form/SignupEditProfile";

const Signup = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerBackVisible: false,
        }}
      />
      <SignupEditProfile />
    </>
  );
};

export default Signup;

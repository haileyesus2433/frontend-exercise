import React from "react";
import { Stack } from "expo-router";
import SignupEditProfile from "../../components/form/SignupEditProfile";

const Profile = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerBackVisible: false,
        }}
      />
      <SignupEditProfile editing={true} />
    </>
  );
};

export default Profile;

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Redirect, Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";
import { IState } from "../../types";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { token } = useSelector((state: IState) => state.auth);

  if (!token) {
    return <Redirect href={"/(auth)/login"} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.bgColor,
          borderTopWidth: 0,
          padding: 0,
        },
        tabBarLabelPosition: "beside-icon",
        tabBarLabelStyle: {
          fontSize: 18,
          fontWeight: "500",
        },
        tabBarActiveTintColor: Colors.primaryColor,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="pencil" color={color} />,
        }}
      />
    </Tabs>
  );
}

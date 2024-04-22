import { Stack } from "expo-router";
import { FormProvider } from "../context/formContext";
import { Provider } from "react-redux";
import store from "../redux/store";

export default function RootLayoutNav() {
  return (
    <Provider store={store}>
      <FormProvider>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(user)" options={{ headerShown: false }} />
        </Stack>
      </FormProvider>
    </Provider>
  );
}

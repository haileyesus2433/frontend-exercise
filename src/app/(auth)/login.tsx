import { View, Text, SafeAreaView } from "react-native";
import React, { useContext, useEffect } from "react";
import { Link, Stack, useRouter } from "expo-router";
import Colors from "../../constants/Colors";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { validateLogin } from "../../utils/validations";
import { IState } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import Loader from "../../components/Loader";
import FormContext from "../../context/formContext";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  let { isLoading, error } = useSelector((state: IState) => state.auth);

  const { inputs, handleOnChange, handleError, resetInputs, errors } =
    useContext(FormContext);

  const loginHandler = () => {
    let isValid = validateLogin({
      values: {
        email: inputs.email,
        password: inputs.password,
      },
      handleError,
    });
    if (isValid) {
      dispatch(login(inputs));
      if (!isLoading && !error) {
        resetInputs();
        router.replace("/(user)/");
      }
    }
  };

  // Effect for Showing login Error Alert
  useEffect(() => {
    if (error && !isLoading) {
      alert(error || "There seems to be a problem please try again");
    }
  }, [error, isLoading]);

  if (isLoading) return <Loader />;

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerBackVisible: false,
        }}
      />
      <SafeAreaView style={{ backgroundColor: Colors.bgColor, flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              paddingHorizontal: 20,
            }}
          >
            <Text
              style={{
                color: Colors.primaryColor,
                fontSize: 40,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Login
            </Text>
            <View>
              <Input
                label="Email"
                value={inputs.email}
                onChangeHandler={(email) => handleOnChange(email, "email")}
                error={errors.email}
                onFocusHandler={() => {
                  handleError(null, "email");
                }}
                iconName="email-outline"
                placeholder="Email"
              />
              <Input
                label="Password"
                value={inputs.password}
                iconName="lock-outline"
                onChangeHandler={(text) => handleOnChange(text, "password")}
                error={errors.password}
                onFocusHandler={() => {
                  handleError(null, "password");
                }}
                placeholder="Enter Password"
                password
              />
            </View>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20, flex: 0.25 }}>
          <Button title="Login" onPress={loginHandler} />
          <Link
            href="/(auth)/signup"
            style={{
              fontSize: 16,
              textAlign: "center",
              fontWeight: "bold",
              color: Colors.black,
            }}
          >
            Don't Have An Account? Signup
          </Link>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Login;

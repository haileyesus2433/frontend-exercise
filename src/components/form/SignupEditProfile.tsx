import { useDispatch, useSelector } from "react-redux";
import { ScrollView, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import * as Location from "expo-location";
import Colors from "../../constants/Colors";
import Button from "../Button";
import Input from "../Input";
import { validateSignup } from "../../utils/validations";
import FormContext from "../../context/formContext";
import { reverseGeocode } from "../../utils/reverseGeocode";
import { IInputs, IState } from "../../types";
import { signup, update } from "../../redux/slices/authSlice";
import Loader from "../Loader";

const SignupEditProfile = ({ editing }: { editing?: boolean }) => {
  const router = useRouter();

  const dispatch = useDispatch();

  let { isLoading, error, user, token } = useSelector(
    (state: IState) => state.auth
  );

  const {
    inputs,
    setInputs,
    handleError,
    resetInputs,
    errors,
    handleOnChange,
  } = useContext(FormContext);

  // Effect for getting user location
  useEffect(() => {
    //try to get the users location using expo location
    const getPermission = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          // If User didnt accept the request show a message
          alert(
            "Please allow us to access your location for better user experience"
          );
          return;
        }
        // if user accepts request get location
        let currentLocation = await Location.getCurrentPositionAsync({});
        // reverse geocode the given latitude and longitude
        let address = await reverseGeocode({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
        //set the adress to the reverse geocodedd location
        setInputs((prevInputs: IInputs) => ({ ...prevInputs, address }));
      } catch (error) {
        console.log(error || "Problem Locating Your Address");
      }
    };

    if (!editing) {
      getPermission();
    }
  }, []);

  // Effect for Showing signup Error Alert
  useEffect(() => {
    if (error && !isLoading) {
      alert(error || "There seems to be a problem please try again");
    }
  }, [error, isLoading]);

  // IF EDITING Get The Current Logged in user from redux and populate the field for editing
  useEffect(() => {
    if (editing) {
      // check if there is a user else redirect to login
      if (user) {
        setInputs((prevInputs: IInputs) => ({ ...prevInputs, ...user }));
      } else {
        router.replace("/(auth)/login");
      }
    }
  }, []);

  const submitHandler = async () => {
    if (editing) {
      const isValid = validateSignup({ inputs, handleError });
      if (isValid) {
        dispatch(update({ values: inputs, token, id: user._id }));
      }
    } else {
      const isValid = validateSignup({ inputs, handleError });
      if (isValid) {
        dispatch(signup(inputs));
        if (!isLoading && !error) {
          resetInputs();
          router.push("/(auth)/login");
        }
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.bgColor,
      }}
    >
      <Text
        style={{
          color: Colors.primaryColor,
          fontSize: 40,
          fontWeight: "bold",
          marginTop: "5%",
          marginLeft: "5%",
        }}
      >
        {!editing ? "Sign Up" : "Edit Profile"}
      </Text>
      {/* <Loader visible={loading} /> */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: 10,
          paddingHorizontal: 20,
        }}
      >
        <View style={{ flex: 2 }}>
          <Input
            label="First Name"
            value={inputs.firstName}
            onChangeHandler={(text: string) =>
              handleOnChange(text, "firstName")
            }
            error={errors.firstName}
            onFocusHandler={() => {
              handleError(null, "firstName");
            }}
            iconName="account-outline"
            placeholder="First Name"
          />

          <Input
            label="Last Name"
            value={inputs.lastName}
            onChangeHandler={(text) => handleOnChange(text, "lastName")}
            error={errors.lastName}
            onFocusHandler={() => {
              handleError(null, "lastName");
            }}
            iconName="account-outline"
            placeholder="Last Name"
          />
          <Input
            label="Username"
            value={inputs.userName}
            onChangeHandler={(text) => handleOnChange(text, "userName")}
            error={errors.userName}
            onFocusHandler={() => {
              handleError(null, "userName");
            }}
            iconName="account-outline"
            placeholder="Username"
          />
          <Input
            label="Address"
            value={inputs.address}
            onChangeHandler={(text) => handleOnChange(text, "address")}
            error={errors.address}
            onFocusHandler={() => {
              handleError(null, "address");
            }}
            iconName="home-city-outline"
            placeholder="City,Country"
          />
          <Input
            label="Email"
            value={inputs.email}
            onChangeHandler={(text) => handleOnChange(text, "email")}
            error={errors.email}
            onFocusHandler={() => {
              handleError(null, "email");
            }}
            iconName="email-outline"
            placeholder="Email"
          />
          {!editing && (
            <>
              <Input
                onChangeHandler={(text) => handleOnChange(text, "password")}
                onFocusHandler={() => handleError(null, "password")}
                iconName="lock-outline"
                label="Password"
                value={inputs.password}
                placeholder="Enter your password"
                error={errors.password}
                password
              />
              <Input
                onChangeHandler={(text) =>
                  handleOnChange(text, "confirmPassword")
                }
                onFocusHandler={() => handleError(null, "confirmPassword")}
                iconName="lock-outline"
                label="Confirm Password"
                placeholder="Enter Your Password Again"
                error={errors.confirmPassword}
                value={inputs.confirmPassword}
                password
              />
            </>
          )}

          <Input
            label="ProfileURL(optional)"
            value={inputs.profilePic}
            onChangeHandler={(text) => handleOnChange(text, "profilePic")}
            onFocusHandler={() => {
              handleError(null, "profilePic");
            }}
            iconName="account-outline"
            placeholder="https://example.com/profile.jpg"
          />
        </View>
      </ScrollView>
      <View style={{ paddingHorizontal: 20, flex: 0.25 }}>
        <Button title="Submit" onPress={submitHandler} />
        {!editing && (
          <Link
            href={"/login"}
            style={{
              fontSize: 16,
              textAlign: "center",
              fontWeight: "bold",
              color: Colors.black,
            }}
          >
            Already Have An Account? Login
          </Link>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SignupEditProfile;

import { Redirect, Stack } from "expo-router";
import { useSelector } from "react-redux";
import { IState } from "../../types";

export default function AuthLayout() {
  const { token } = useSelector((state: IState) => state.auth);

  if (token) {
    return <Redirect href={"/(user)/"} />;
  }

  return <Stack />;
}

import React from "react";
import { useSelector } from "react-redux";
import { fetchUser } from "../lib/slices/authSlice";
import { type RootState, useAppDispatch } from "../lib/store";
import Spinner from "./Spinner";
import SplashScreen from "./SplashScreen";

const AuthInit: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { status } = useSelector((state: RootState) => state.auth);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchUser());
  }, []);

  if (status === "init") {
    return <SplashScreen />;
  }

  return <>{children}</>;
};

export default AuthInit;

import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import TextInput from "../components/input/TextInput";
import { authSelector, fetchUser, login } from "../lib/slices/authSlice";
import { useAppDispatch } from "../lib/store";
import { Credentials } from "../types/auth";

const Login: React.FC<{}> = () => {
  const { status, loading } = useSelector(authSelector);
  const [error, setError] = React.useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    const fieldValues = Object.fromEntries(formData.entries()) as Credentials;
    dispatch(login(fieldValues))
      .unwrap()
      .then(() => dispatch(fetchUser()))
      .catch(() => {
        setError("Invalid credentials");
      });
  };

  if (status === "authenticated") {
    return <Navigate to="/" />;
  }

  return (
    <div>
      {!!error && <span className="text-red-500">{error}</span>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <TextInput name="email" />
        <label htmlFor="password">Password</label>
        <TextInput name="password" type="password" />
        <button>Sign in</button>
      </form>
    </div>
  );
};

export default Login;

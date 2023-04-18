import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PrimaryBtn from "../components/button/PrimaryBtn";
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
    <div className="flex flex-col min-h-full justify-center">
      <div className="mx-auto w-full max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {!!error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <div>
            <label htmlFor="email" className="block text-sm">
              Email
            </label>
            <TextInput name="email" type="email" className="block mt-2" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm">
              Password
            </label>
            <TextInput name="password" type="password" className="block mt-2" />
          </div>
          <PrimaryBtn loading={loading}>Sign in</PrimaryBtn>
        </form>
      </div>
    </div>
  );
};

export default Login;

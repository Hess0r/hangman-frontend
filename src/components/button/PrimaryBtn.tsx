import React from "react";
import Spinner from "../Spinner";

type PrimaryBtnProps = {
  loading?: boolean;
};

const PrimaryBtn: React.FC<
  React.PropsWithChildren<
    PrimaryBtnProps & React.ButtonHTMLAttributes<HTMLButtonElement>
  >
> = ({ children, loading, ...props }) => {
  return (
    <button
      {...props}
      className="flex w-full justify-center items-center rounded bg-sky-500 px-3 py-1.5 text-white uppercase hover:bg-sky-400"
    >
      {loading && <Spinner className="w-4 h-4 text-white animate-spin mr-2" />}
      Sign in
    </button>
  );
};

export default PrimaryBtn;

import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OutlineBtn from "../components/button/OutlineBtn";
import PrimaryBtn from "../components/button/PrimaryBtn";
import TextInput from "../components/input/TextInput";
import { adminSelector, createWord, getWords } from "../lib/slices/adminSlice";
import { useAppDispatch } from "../lib/store";

const Admin: React.FC<{}> = () => {
  const { words, loading: listLoading } = useSelector(adminSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    dispatch(getWords());
  }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setError(null);

    if (inputValue.length < 6) {
      setError("The word must be at least 6 characters long.");
      return;
    }
    if (inputValue.length > 14) {
      setError("The word must be at most 14 characters long.");
      return;
    }

    dispatch(createWord(inputValue))
      .unwrap()
      .then(() => {
        dispatch(getWords());
        setInputValue("");
      })
      .catch((e) => {
        if (e.status === 422) {
          setError(e.data.message);
        }
      });
  };

  const handleBack = () => navigate(-1);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setError(null);
    setInputValue(e.target.value);
  };

  return (
    <div className="flex flex-col gap-16 items-center">
      <h1 className="text-3xl font-semibold">Admin</h1>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3 xl:gap-16">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <p className="text-sm">Type the word you want to add to the list</p>

            <TextInput
              name="word"
              type="text"
              className="block"
              value={inputValue}
              onChange={handleInputChange}
            />
            {!!error && <span className="text-sm text-red-500">{error}</span>}

            <PrimaryBtn
              loading={false}
              className="w-full"
              disabled={!inputValue || !!error}
            >
              Save
            </PrimaryBtn>

            <OutlineBtn
              type="button"
              loading={false}
              className="w-full"
              onClick={() => handleBack()}
            >
              Back
            </OutlineBtn>
          </div>
        </form>
        <ul className="grid grid-cols-2 gap-x-12 md:grid-cols-3 xl:col-span-2 xl:grid-cols-4">
          {words.map((word) => (
            <li key={`word-list-${word.id}`} className="text-sm">
              {word.word}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;

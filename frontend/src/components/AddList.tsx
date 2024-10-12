import { useState } from "react";
import AddNewInput from "./AddNewInput";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../store/hooks";
import { addList } from "../store/todoListsSlice";

const AddList = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [newListValue, setNewListValue] = useState("");

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setNewListValue(value);
  };

  const handleAddListClick = async () => {
    await dispatch(addList({
      name: newListValue
    }));

    setNewListValue("");
  };

  return (
    <div className="w-full flex justify-center items-center h-24">
      <div className="h-10">
        <AddNewInput
          inputValue={newListValue}
          onInputChange={handleInputChange}
          inputPlaceholder={t("Add a new list...")}
          onButtonClick={handleAddListClick}
          buttonAriaLabel={t("Add new list")}
        />
      </div>
    </div>
  );
};

export default AddList;

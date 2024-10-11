import { useState } from "react";
import { TodoItem } from "../models";
import api from "../../src/api";
import { endpoints } from "../api/endpoints";
import icons from "../assets/icons";

interface ItemProps {
  listId: number
  item: TodoItem
}

const { checkedIcon, uncheckedIcon } = icons;

const Item = ({ listId, item }: ItemProps) => {
  const { id: itemId, name, description, done: initialDoneState } = item;

  const [doneState, setDoneState] = useState(initialDoneState);

  const handleDoneButtonClick = async () => {
    const updatedDoneState = !doneState;

    await api.put(endpoints.todoItem(listId, itemId), {
      name,
      description,
      done: updatedDoneState
    });

    setDoneState(updatedDoneState);
  };

  return (
    <div className="flex">
      <button onClick={handleDoneButtonClick}>
        <img src={doneState ? checkedIcon : uncheckedIcon} className="h-10 w-10"/>
      </button>
      <span>
        {name}
      </span>
    </div>
  );
};

export default Item;

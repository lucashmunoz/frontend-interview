import { useState } from "react";
import { TodoItem } from "../models/Item";
import api from "../../src/api";
import { endpoints } from "../api/endpoints";

interface ItemProps {
  listId: number
  item: TodoItem
}

const itemChecked = "src/assets/item-checked.svg";
const itemUnChecked = "src/assets/item-unchecked.svg";

const Item = ({ listId, item }: ItemProps) => {
  const { id: itemId, name, description, done: initialDoneState } = item;

  const [doneState, setDoneState] = useState(initialDoneState);

  console.log(endpoints.todoItem(listId, itemId));

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
        <img src={doneState ? itemChecked : itemUnChecked} className="h-10 w-10"/>
      </button>
      <span>
        {name}
      </span>
    </div>
  );
};

export default Item;

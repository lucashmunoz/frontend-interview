import { useState } from "react";
import { TodoItem } from "../models/Item";
import axios from "axios";

interface ItemProps {
  listId: number
  item: TodoItem
}

const itemChecked = "src/assets/item-checked.svg";
const itemUnChecked = "src/assets/item-unchecked.svg";

const Item = ({ listId, item }: ItemProps) => {
  const { id, name, description, done: initialDoneState } = item;

  const [doneState, setDoneState] = useState(initialDoneState);

  const handleDoneButtonClick = async () => {
    const updatedDoneState = !doneState;

    await axios.put(`http://localhost:4000/api/todo-lists/${listId}/todo-items/${id}`, {
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

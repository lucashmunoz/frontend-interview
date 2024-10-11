import { TodoItem } from "../models";
import icons from "../assets/icons";
import { useAppDispatch } from "../store/hooks";
import { deleteTodoItem, updateTodoItem } from "../store/todoItemsSlice";
import { fetchLists } from "../store/todoListsSlice";

interface ItemProps {
  listId: number
  item: TodoItem
}

const { checkedIcon, uncheckedIcon, btnDelete } = icons;

const Item = ({ listId, item }: ItemProps) => {
  const dispatch = useAppDispatch();
  const { id: itemId, name, done } = item;

  const handleDoneButtonClick = async () => {
    await dispatch(updateTodoItem({
      listId, itemId, item: {
        done: !done
      }
    }));

    // fetching the updated lists
    dispatch(fetchLists());
  };

  const handleDelete = async () => {
    await dispatch(deleteTodoItem({
      listId, itemId
    }));

    // fetching the updated lists
    dispatch(fetchLists());
  };

  return (
    <li>
      <div className="flex items-center gap-3 py-1">
        <button onClick={handleDoneButtonClick}>
          <img src={done ? checkedIcon : uncheckedIcon} className="h-7 w-7"/>
        </button>
        <span className={`flex-1 ${done && "line-through"}`}>
          {name}
        </span>
        <button onClick={handleDelete}>
          <img src={btnDelete} className="h-5 w-5"/>
        </button>
      </div>
    </li>
  );
};

export default Item;

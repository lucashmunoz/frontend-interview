import { TodoItem } from "../models";
import icons from "../assets/icons";
import { useAppDispatch } from "../store/hooks";
import { deleteTodoItem, updateTodoItem } from "../store/todoItemsSlice";
import { useTranslation } from "react-i18next";

interface ItemProps {
  listId: number
  item: TodoItem
}

const { checkedIcon, uncheckedIcon, btnDelete } = icons;

const Item = ({ listId, item }: ItemProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { id: itemId, name, done } = item;

  const handleDoneButtonClick = () => {
    dispatch(updateTodoItem({
      listId, itemId, item: {
        done: !done
      }
    }));
  };

  const handleDelete = () => {
    dispatch(deleteTodoItem({
      listId, itemId
    }));
  };

  return (
    <div className="flex items-center gap-3 py-1">
      <button
        onClick={handleDoneButtonClick}
        aria-label={done ? t("Mark as not done") : t("Mark as done")}
      >
        {/* empty alt attribute to hide the decorative image from a11y tools */}
        <img alt="" src={done ? checkedIcon : uncheckedIcon} className="h-7 w-7"/>
      </button>
      <span className={`flex-1 ${done && "line-through"}`}>
        {name}
      </span>
      <button onClick={handleDelete} aria-label={t("Delete item")}>
        {/* empty alt attribute to hide the decorative image from a11y tools */}
        <img alt="" src={btnDelete} className="h-5 w-5"/>
      </button>
    </div>
  );
};

export default Item;

import { useEffect, useState } from "react";
import { TodoList } from "../models";
import Item from "./Item";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../store/hooks";
import { addTodoItem } from "../store/todoItemsSlice";
import { Reorder } from "framer-motion";
import AddNewInput from "./AddNewInput";
import icons from "../assets/icons";
import { deleteList } from "../store/todoListsSlice";

const { btnDelete } = icons;

interface ListProp {
  list: TodoList
}

const List = ({ list }: ListProp) => {
  const dispatch = useAppDispatch();

  const { id, name, todoItems } = list;
  const { t } = useTranslation();

  const [newTask, setNewTask] = useState("");
  const [orderedItems, setOrderedItems] = useState(todoItems);

  const listTitleId = `list-${id}`;

  const handleNewTaskChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setNewTask(value);
  };

  const handleAddTask = () => {
    dispatch(addTodoItem({
      listId: id,
      item: {
        name: newTask,
        // No description added in TODO list input
        description: ""
      }
    }));
  };

  const handleDeleteList = () => {
    dispatch(deleteList({
      listId: id
    }));
  };

  /*
  * Since the drag and drog effect it's not recorded on the DB,
  * the list has no ability to record its items order.
  *
  * Because of that, when an update is made, it'd be needed to first find the change type
  * (update, add or delete), and then apply it to the item directly in the orderedItems array,
  * without affecting the list order.
  *
  * To simplify the logic, the effect here it's just updating all the items of the group,
  * losing the order.
  */
  useEffect(() => {
    setOrderedItems(todoItems);
  }, [todoItems]);

  return (
    <section className="w-full border-2 border-black rounded-xl overflow-hidden min-h-60" aria-labelledby={listTitleId}>
      <div className="h-10 bg-black relative">
        <h2 id={listTitleId} className="h-full content-center text-white text-2xl font-bold flex-grow text-center">{name}</h2>
        <button className="h-full absolute top-0 right-0 p-2" onClick={handleDeleteList}>
          <img src={btnDelete} className="w-full h-full fill-white filter invert"/>
        </button>
      </div>
      <div className="p-6">
        <AddNewInput
          inputValue={newTask}
          onInputChange={handleNewTaskChange}
          inputPlaceholder={t("Add your task...")}
          onSubmit={handleAddTask}
          buttonAriaLabel={t("Add Task")}
        />
        {orderedItems.length === 0
          ? <div className="px-4 py-10">
            <p>
              {t("No tasks have been entered yet")}
            </p>
          </div>
          : <Reorder.Group className="pt-4" values={orderedItems} onReorder={setOrderedItems}>
            {
              orderedItems.map(item =>(
                <Reorder.Item key={item.id} value={item}>
                  <Item item={item} listId={id}/>
                </Reorder.Item>
              ))
            }
          </Reorder.Group>
        }
      </div>
    </section>
  );
};

export default List;

import { useState } from "react";
import { TodoList } from "../models";
import Item from "./Item";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../store/hooks";
import { addTodoItem } from "../store/todoItemsSlice";
import { Reorder } from "framer-motion";
import { fetchLists } from "../store/todoListsSlice";
import AddNewInput from "./AddNewInput";

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

  const handleAddTask = async() => {
    await dispatch(addTodoItem({
      listId: id,
      item: {
        name: newTask,
        // No description added in TODO list input
        description: ""
      }
    }));

    // fetching the updated lists
    dispatch(fetchLists());
  };

  return (
    <section className="w-full border-2 border-black rounded-xl overflow-hidden min-h-60" aria-labelledby={listTitleId}>
      <div className="h-10 bg-black flex justify-center items-center">
        <h2 id={listTitleId} className="text-white text-2xl font-bold">{name}</h2>
      </div>
      <div className="p-6">
        <AddNewInput
          inputValue={newTask}
          onInputChange={handleNewTaskChange}
          inputPlaceholder={t("Add your task...")}
          onButtonClick={handleAddTask}
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

import { useState } from "react";
import { TodoList } from "../models";
import Item from "./Item";
import { useTranslation } from "react-i18next";
import icons from "../assets/icons";
import { useAppDispatch } from "../store/hooks";
import { addTodoItem } from "../store/todoItemsSlice";

interface ListProp {
  list: TodoList
}

const { btnAdd } = icons;

const List = ({ list }: ListProp) => {
  const dispatch = useAppDispatch();

  const { id, name, todoItems } = list;
  const { t } = useTranslation();

  const [newTask, setNewTask] = useState("");

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

  return (
    <section className="w-full border-2 border-black rounded-xl overflow-hidden	" aria-labelledby={listTitleId}>
      <div className="h-10 bg-black flex justify-center items-center">
        <h2 id={listTitleId} className="text-white text-2xl font-bold">{name}</h2>
      </div>
      <div className="p-6">
        <div
          className="border-2 border-black rounded-3xl w-full flex overflow-hidden"
        >
          <input
            className="w-full py-2 px-4"
            placeholder={t("Add your task...")}
            value={newTask}
            onChange={handleNewTaskChange}
          />
          <button onClick={handleAddTask} aria-label={t("Add Task")}>
            <img src={btnAdd} className="h-10 w-10"/>
          </button>
        </div>
        {todoItems.length === 0
          ? <div className="px-4 py-10">
            <p>
              {t("No tasks have been entered yet")}
            </p>
          </div>
          : <ul className="pt-4">
            {
              todoItems.map(item => {
                return (
                  <Item key={item.id} item={item} listId={id}/>
                );
              })
            }
          </ul>
        }
      </div>
    </section>
  );
};

export default List;

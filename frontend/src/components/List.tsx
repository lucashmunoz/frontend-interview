import { useEffect, useState } from "react";
import { TodoItem } from "../models";
import api from "../../src/api";
import Item from "./Item";
import { endpoints } from "../api/endpoints";
import { useTranslation } from "react-i18next";

interface ListProp {
  name: string
  id: number
}

const List = ({ id, name }: ListProp) => {
  const { t } = useTranslation();

  const [items, setItems] = useState<TodoItem[]>([]);

  useEffect(() => {
    const fetchTodoItems = async () => {
      const response = await api.get(endpoints.todoItems(id));
      setItems(response.data);
    };

    fetchTodoItems();
  }, [id]);

  return (
    <section className="w-ful">
      <h2 className="bg-black text-white text-center">{name}</h2>
      <div>
        <input placeholder={t("Add your task...")}/>
      </div>
      {
        items.map(item => {
          return (
            <Item key={item.id} item={item} listId={id}/>
          );
        })
      }
    </section>
  );
};

export default List;

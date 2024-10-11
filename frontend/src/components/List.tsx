import { useEffect, useState } from "react";
import { TodoItem } from "../models/Item";
import axios from "axios";
import Item from "./Item";

interface ListProp {
  name: string
  id: number
}

const List = ({ id, name }: ListProp) => {
  const [items, setItems] = useState<TodoItem[]>([]);

  useEffect(() => {
    const fetchTodoItems = async () => {
      const response = await axios.get(`http://localhost:4000/api/todo-lists/${id}/todo-items`);
      setItems(response.data);
    };

    fetchTodoItems();
  }, [id]);

  return (
    <section className="w-ful">
      <h2 className="bg-[#1e1e1e] text-white text-center">{name}</h2>
      <div>
        <input placeholder="Add your task..."/>
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

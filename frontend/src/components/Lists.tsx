import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchLists, selectTodoLists } from "../store/todoListsSlice";
import List from "./List";

const Lists = () => {
  const dispatch = useAppDispatch();
  const lists = useAppSelector(selectTodoLists);

  useEffect(() => {
    dispatch(fetchLists());
  }, [dispatch]);

  return (
    <div className="flex gap-5 flex-wrap">
      {lists.map(list => (
        <div key={list.id} className="max-w-md min-w-80">
          <List list={list}/>
        </div>
      ))}
    </div>
  );
};

export default Lists;

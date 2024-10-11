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
    <>
      {lists.map(list => (
        <div key={list.id} className="py-2">
          <List list={list}/>
        </div>
      ))}
    </>
  );
};

export default Lists;

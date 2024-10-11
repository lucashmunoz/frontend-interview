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
      {lists.map(list => {
        const { id, name } = list;
        return (
          <List key={id} id={id} name={name}/>
        );
      })}
    </>
  );
};

export default Lists;

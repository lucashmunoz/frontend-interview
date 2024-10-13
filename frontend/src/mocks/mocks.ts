import { TodoList } from "../models";

const list1: TodoList = {
  id: 1,
  name: "Groceries",
  todoItems: [
    {
      id: 1,
      name: "Buy milk",
      description: "Buy a gallon of milk from the store",
      done: false
    },
    {
      id: 2,
      name: "Buy eggs",
      description: "Buy a dozen eggs",
      done: false
    },
    {
      id: 3,
      name: "Buy bread",
      description: "Buy a loaf of whole grain bread",
      done: false
    },
    {
      id: 4,
      name: "Buy fruits",
      description: "Buy apples and bananas",
      done: true
    }
  ]
};

const list2: TodoList = {
  id: 2,
  name: "Chores",
  todoItems: [
    {
      id: 1,
      name: "Clean the house",
      description: "Vacuum and dust all rooms",
      done: false
    },
    {
      id: 2,
      name: "Wash dishes",
      description: "Clean all dirty dishes in the sink",
      done: false
    },
    {
      id: 3,
      name: "Do laundry",
      description: "Wash and fold clothes",
      done: true
    },
    {
      id: 4,
      name: "Take out trash",
      description: "Take out the trash to the curb",
      done: false
    }
  ]
};

const list3: TodoList = {
  id: 3,
  name: "Assignments",
  todoItems: [
    {
      id: 1,
      name: "Math homework",
      description: "Complete algebra exercises",
      done: true
    },
    {
      id: 2,
      name: "Science project",
      description: "Prepare presentation on the solar system",
      done: false
    }
  ]
};

export const todoLists: TodoList[] = [list1, list2, list3];

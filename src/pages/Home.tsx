import { useState } from "react";
import "./Home.css";
import {
  AddTodo,
  Filter,
  FilterButton,
  TodoElement,
  TodoState,
} from "../components";
import type { Todo } from "../components";
import { Divider, List } from "@mui/material";

export const Home = () => {
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [todos, setTodos] = useState<Todo[]>([]);

  const updateTodo = (index: number, state: TodoState) => {
    setTodos((oldTodos) => {
      const newTodos = [...oldTodos];
      newTodos[index].state = state;
      return newTodos;
    });
  };

  const deleteTodo = (index: number) => {
    setTodos((oldTodos) => {
      const newTodos = [...oldTodos];
      newTodos.splice(index, 1);
      return newTodos;
    });
  };

  return (
    <div className="home-container">
      <h1>Todo List V2</h1>
      <AddTodo setTodos={setTodos} />
      <Divider></Divider>
      <div>
        <FilterButton filter={Filter.All} setFilter={setFilter} />
        <FilterButton filter={Filter.Completed} setFilter={setFilter} />
        <FilterButton filter={Filter.Pending} setFilter={setFilter} />
      </div>
      <List>
        {todos
          .filter((x) => {
            switch (filter) {
              case Filter.All:
                return true;
              case Filter.Completed:
                return x.state === TodoState.Completed;
              case Filter.Pending:
                return x.state === TodoState.Pending;
            }
          })
          .map((todo, index) => (
            <TodoElement
              todo={todo}
              index={index}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          ))}
      </List>
    </div>
  );
};

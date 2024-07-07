import { Add } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { Todo, TodoState } from "./TodoElement";
import { useState } from "react";
import "./AddTodo.css";

interface AddTodoProps {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const AddTodo = ({ setTodos }: AddTodoProps) => {
  const [newTodo, setNewTodo] = useState<string>("");

  return (
    <div className="add-todo-container">
      <TextField
        size="small"
        label="New Todo..."
        variant="outlined"
        onChange={(x) => setNewTodo(x.target.value)}
      />
      <IconButton
        aria-label="add todo"
        color="primary"
        disabled={newTodo === ""}
        size="small"
        onClick={() => {
          setTodos((x) => [...x, { title: newTodo, state: TodoState.Pending }]);
        }}
      >
        <Add />
      </IconButton>
    </div>
  );
};

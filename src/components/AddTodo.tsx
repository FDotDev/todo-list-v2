import { Add } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { useState } from "react";
import "./AddTodo.css";

interface AddTodoProps {
  addTodo: (title: string) => void;
}

export const AddTodo = ({ addTodo }: AddTodoProps) => {
  const [title, setTitle] = useState<string>("");

  const onAddTodo = () => {
    addTodo(title);
    setTitle("");
  };

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <div className="add-todo-container">
      <TextField
        size="small"
        label="New Todo..."
        variant="outlined"
        value={title}
        onChange={onTitleChange}
      />
      <IconButton
        aria-label="add todo"
        color="primary"
        disabled={title === ""}
        size="small"
        onClick={onAddTodo}
      >
        <Add />
      </IconButton>
    </div>
  );
};

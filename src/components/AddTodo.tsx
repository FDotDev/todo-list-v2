import { Add } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { useState } from "react";
import "./AddTodo.css";
import { useTodos } from "../hooks";
import { v4 } from "uuid";

export const AddTodo = () => {
  const { upsertTodo } = useTodos();
  const [title, setTitle] = useState<string>("");

  const onAddTodo = () => {
    upsertTodo({ id: v4(), title, completed: false });
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

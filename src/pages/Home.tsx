import { useState } from "react";
import { AddTodo, Filter, FilterButton } from "../components";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Snackbar,
} from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { v4 } from "uuid";

import type {
  ColDef,
  ICellRendererParams,
  NewValueParams,
} from "ag-grid-community";

import "./Home.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Delete } from "@mui/icons-material";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export const Home = () => {
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoToDelete, setTodoToDelete] = useState<string | null>(null);

  const addTodo = (title: string) => {
    setTodos((oldTodos) => [
      ...oldTodos,
      { id: v4(), title, completed: false },
    ]);
  };

  const updateTodo = (updatedTodo: Todo) => {
    setTodos((oldTodos) => {
      const newTodos = [...oldTodos];
      const index = newTodos.findIndex((x) => x.id === updatedTodo.id);
      newTodos[index] = updatedTodo;
      return newTodos;
    });
  };

  const deleteTodo = (id: string) => {
    setTodos((oldTodos) => {
      const newTodos = [...oldTodos];
      const index = newTodos.findIndex((x) => x.id === id);
      newTodos.splice(index, 1);
      return newTodos;
    });
  };

  const onCellValueChanged = (event: NewValueParams) => updateTodo(event.data);

  const colDefs = [
    { field: "title", editable: true, filter: true, onCellValueChanged },
    {
      field: "completed",
      editable: true,
      onCellValueChanged,
    },
    {
      headerName: "Actions",
      field: "id",
      sortable: false,
      cellRenderer: (params: ICellRendererParams<Todo>) => (
        <IconButton
          onClick={() => setTodoToDelete(params.value)}
          color="primary"
        >
          <Delete />
        </IconButton>
      ),
    },
  ] as ColDef[];

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case Filter.All:
        return true;
      case Filter.Completed:
        return todo.completed;
      case Filter.Pending:
        return !todo.completed;
    }
  });

  const onCancelTodoToDelete = () => setTodoToDelete(null);

  const onDeleteTodo = () => {
    if (todoToDelete !== null) {
      deleteTodo(todoToDelete);
      setTodoToDelete(null);
    }
  };

  return (
    <div className="home-container">
      <h1>Todo List V2</h1>
      <AddTodo addTodo={addTodo} />
      <Divider></Divider>
      <div>
        <FilterButton filter={Filter.All} setFilter={setFilter} />
        <FilterButton filter={Filter.Completed} setFilter={setFilter} />
        <FilterButton filter={Filter.Pending} setFilter={setFilter} />
      </div>
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact rowData={filteredTodos} columnDefs={colDefs} />
      </div>
      {/* TODO: Add alert when a todo is deleted */}
      <Dialog open={todoToDelete !== null} onClose={onCancelTodoToDelete}>
        <DialogTitle>Are You Sure to Delete the Todo?</DialogTitle>
        <DialogContent>This action can't be undone</DialogContent>
        <DialogActions>
          <Button onClick={onCancelTodoToDelete}>CANCEL</Button>
          <Button color="error" onClick={onDeleteTodo}>
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

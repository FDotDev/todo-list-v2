import { useState } from "react";
import { AddTodo, Filter, FilterButton } from "../components";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { v4 } from "uuid";
import { Delete } from "@mui/icons-material";
import { useTodos } from "../hooks";

import type {
  ColDef,
  ICellRendererParams,
  NewValueParams,
} from "ag-grid-community";
import type { Todo } from "../api";

import "./Home.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

export const Home = () => {
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const { todosQuery, upsertTodo, deleteTodo } = useTodos();
  const [todoToDelete, setTodoToDelete] = useState<string | null>(null);

  const onCellValueChanged = (event: NewValueParams) => upsertTodo(event.data);

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

  const filteredTodos = todosQuery.data?.filter((todo) => {
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
      deleteTodo(todoToDelete, {
        onSuccess: () => {
          setTodoToDelete(null);
        },
      });
    }
  };

  return (
    <div className="home-container">
      <h1>Todo List V2</h1>
      <AddTodo />
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

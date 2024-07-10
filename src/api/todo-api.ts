export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const saveTodosToLocal = (todos: Todo[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getLocalTodos = (): Todo[] => {
  const todos = localStorage.getItem("todos");
  return todos !== null ? JSON.parse(todos) : [];
};

export const getTodos = async (): Promise<Todo[]> => {
  return getLocalTodos();
};

export const upsertTodo = async (todo: Todo) => {
  const todos = getLocalTodos();
  const index = todos.findIndex((x) => x.id === todo.id);
  if (index === -1) {
    todos.push(todo);
  } else {
    todos[index] = todo;
  }
  saveTodosToLocal(todos);
};

export const deleteTodo = async (id: string) => {
  const todos = getLocalTodos();
  const newTodos = todos.filter((x) => x.id !== id);
  saveTodosToLocal(newTodos);
};

import React, { useState } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const Todo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [value, setValue] = useState("");
  const [editId, setEditId] = useState<null | number>(null);

  const handleAddTodo = () => {
    if (!value) return;
    if (editId) {
      setTodos((prevTodos) => {
        return prevTodos.map((todo: Todo) => ({
          ...todo,
          text: value,
        }));
      });
      setEditId(null);
    } else {
      const newTodo = {
        id: Date.now(),
        text: value,
        completed: false,
      };
      setTodos([...todos, newTodo]);
    }
    setValue("");
  };

  const markTodoAsCompleted = (id: number) => {
    const updatedTodos = todos.map((todo: Todo) => ({
      ...todo,
      completed: todo.id === id ? true : todo.completed,
    }));
    setTodos(updatedTodos);
  };

  const deleteTodo = (id: number) => {
    const newTodo = todos.filter((todo: Todo) => todo.id !== id);
    setTodos(newTodo);
    if (editId === id) {
      setValue("");
      setEditId(null);
    }
  };

  const handleEditTodo = (id: number) => {
    const todoToBeEdited = todos.find((todo: Todo) => todo.id === id);
    if (todoToBeEdited) {
      setValue(todoToBeEdited.text);
    }
    setEditId(id);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <h2>Todos</h2>
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        {editId}
        <input
          type="text"
          value={value}
          style={{ height: 40, width: 250 }}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={handleAddTodo}>{editId ? "Edit" : "Add"}</button>
      </div>
      <ul role="listbox" style={{ display: "flex", flexDirection: "column" }}>
        {todos.map((todo) => {
          return (
            <div
              role="listitem"
              style={{ display: "flex", alignItems: "center", gap: "20px" }}
            >
              <li
                style={{
                  textDecoration: todo.completed ? "line-through" : "inherit",
                  listStyle: "none",
                  display: "flex",
                  width: 200,
                }}
              >
                {todo.text}
              </li>
              <div>
                <button onClick={() => handleEditTodo(todo.id)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                <button onClick={() => markTodoAsCompleted(todo.id)}>
                  Complete
                </button>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Todo;

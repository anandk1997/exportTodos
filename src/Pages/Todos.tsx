import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CSVLink } from "react-csv";
import TodoComponent from "../Components/TodoComponent";

interface TodoType {
  todo: string;
  status: "Incomplete" | "Complete";
}

function Todo() {
  const [todos, setTodos] = useState<string[]>([]);
  const [todo, setTodo] = useState<string>("");
  const [completedTodos, setCompletedTodos] = useState<string[]>([]);

  const handleAddTodo = (): void => {
    if (!todo.trim()) return;
    setTodos([...todos, todo]);
    setTodo("");
  };

  const handleCompleteTodo = (i: number): void => {
    const newTodos = [...todos];
    const completedTodo = newTodos.splice(i, 1);
    setTodos(newTodos);
    setCompletedTodos([...completedTodos, ...completedTodo]);
  };

  const handleIncompleteTodo = (i: number): void => {
    const newCompletedTodos = [...completedTodos];
    const incompleteTodo = newCompletedTodos.splice(i, 1);
    setCompletedTodos(newCompletedTodos);
    setTodos([...todos, ...incompleteTodo]);
  };

  const headers = [
    { label: "Todo Item", key: "todo" },
    { label: "Status", key: "status" },
  ];

  const data: TodoType[] = [
    ...todos.map((todo) => ({ todo, status: "Incomplete" as const })),
    ...completedTodos.map((todo) => ({ todo, status: "Complete" as const })),
  ];

  const dataValues = (
    todoType: string[],
    status: "Incomplete" | "Complete"
  ): TodoType[] => todoType.map((todo) => ({ todo, status }));

  const handleDeleteTodo = (i: number): void => {
    setTodos(todos.filter((_, index) => index !== i));
  };

  const handleDeleteTodo1 = (i: number): void => {
    setCompletedTodos(completedTodos.filter((_, index) => index !== i));
  };

  const handleUpdateTodo = (i: number, newTodo: string): void => {
    const updatedTodos = [...todos];
    updatedTodos[i] = newTodo;
    setTodos(updatedTodos);
  };

  const handleUpdateTodo1 = (i: number, newTodo: string): void => {
    const updatedCompletedTodos = [...completedTodos];
    updatedCompletedTodos[i] = newTodo;
    setCompletedTodos(updatedCompletedTodos);
  };

  return (
    <div>
      <h2 className="d-flex justify-content-center mt-3">Add Todos</h2>
      <Form.Control
        className="w-25 m-auto"
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <Button
        variant="secondary"
        className="w-25 d-flex justify-content-center m-auto mt-2"
        onClick={handleAddTodo}
      >
        Add
      </Button>

      <div className="d-flex justify-content-center mt-3">
        {todos.length > 0 && (
          <CSVLink
            className="text-decoration-none ms-2 btn btn-danger"
            data={dataValues(todos, "Incomplete")}
            headers={headers}
          >
            Export Incomplete
          </CSVLink>
        )}

        {completedTodos.length > 0 && (
          <CSVLink
            className="text-decoration-none ms-2 btn btn-success"
            data={dataValues(completedTodos, "Complete")}
            headers={headers}
          >
            Export Completed
          </CSVLink>
        )}

        {todos.length > 0 && completedTodos.length > 0 && (
          <CSVLink
            className="text-decoration-none ms-2 btn btn-light"
            data={data}
            headers={headers}
          >
            Export ALL
          </CSVLink>
        )}
      </div>

      {todos.length > 0 || completedTodos.length > 0 ? (
        <div className="d-flex justify-content-center mt-4">
          <div className="todos p-2">
            {todos.map((todo, i) => (
              <TodoComponent
                key={i}
                DeleteTodo={handleDeleteTodo}
                Update={handleUpdateTodo}
                todo={todo}
                Status="Incomplete"
                i={i}
                incomplete={true}
                border="danger"
                // todos={todos}
                handleCompleteTodo={handleCompleteTodo}
              />
            ))}
          </div>

          <div className="todos p-2">
            {completedTodos.map((todo, i) => (
              <TodoComponent
                key={i}
                DeleteTodo={handleDeleteTodo1}
                Update={handleUpdateTodo1}
                todo={todo}
                Status="Complete"
                i={i}
                incomplete={false}
                border="success"
                // todos={completedTodos}
                handleCompleteTodo={handleIncompleteTodo}
              />
            ))}
          </div>
        </div>
      ) : (
        <h1
          className="d-flex align-items-center justify-content-center"
          style={{ height: "70vh" }}
        >
          No Todos Found
        </h1>
      )}
    </div>
  );
}

export default Todo;

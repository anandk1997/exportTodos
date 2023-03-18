import React, { Fragment, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CSVLink } from "react-csv";
import TodoComponent from "../Components/TodoComponent";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleAddTodo = () => {
    if (!todo) return;
    setTodos([...todos, todo]);
    setTodo("");
  };

  const handleCompleteTodo = (i) => {
    const newTodos = [...todos];
    const completedTodo = newTodos.splice(i, 1);
    setTodos(newTodos);
    setCompletedTodos([...completedTodos, ...completedTodo]);
  };

  const handleIncompleteTodo = (i) => {
    const newTodos = [...completedTodos];
    const completedTodo = newTodos.splice(i, 1);
    setCompletedTodos(newTodos);
    setTodos([...todos, ...completedTodo]);
  };

  const headers = [
    { label: "Todo Item", key: "todo" },
    { label: "Status", key: "status" },
  ];

  const data = [
    ...todos.map((todo) => ({ todo: todo, status: "Incomplete" })),

    ...completedTodos.map((todo, i) => ({
      todo: todo,
      status: "Complete",
    })),
  ];

  const dataValues = (todoType, status) =>
    todoType.map((todo) => ({ todo, status: status }));

  const handleDeleteTodo = (i) => {
    const newTodos = [...todos];
    newTodos.splice(i, 1);
    setTodos(newTodos);
  };

  const handleDeleteTodo1 = (i) => {
    const newTodos = [...completedTodos];
    newTodos.splice(i, 1);
    setCompletedTodos(newTodos);
  };

  const handleUpdateTodo = (i, newTodo) => {
    const newTodos = [...todos];
    newTodos[i] = newTodo;
    setTodos(newTodos);
  };

  const handleUpdateTodo1 = (i, newTodo) => {
    const newTodos = [...completedTodos];
    newTodos[i] = newTodo;
    setCompletedTodos(newTodos);
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
        {todos?.length ? (
          <CSVLink
            className="text-decoration-none ms-2 btn btn-danger"
            data={dataValues(todos, "Incompleted")}
            headers={headers}
          >
            Export Incompleted
          </CSVLink>
        ) : null}

        {completedTodos?.length ? (
          <CSVLink
            className="text-decoration-none ms-2 btn btn-success"
            data={dataValues(completedTodos, "Completed")}
            headers={headers}
          >
            Export Completed
          </CSVLink>
        ) : null}

        {todos?.length > 0 &&
          (completedTodos?.length > 0 ? (
            <CSVLink
              className="text-decoration-none ms-2 btn btn-light"
              data={data}
              headers={headers}
            >
              Export ALL
            </CSVLink>
          ) : null)}
      </div>


      {
        todos.length > 0 || completedTodos.length >0 ?
      <div className="d-flex justify-content-center mt-4">
        <div className="todos p-2">
          {todos?.map((todo, i) => (
            <Fragment key={i}>
              <TodoComponent
                DeleteTodo={handleDeleteTodo}
                Update={handleUpdateTodo}
                todo={todo}
                Status="Incompleted"
                i={i}
                incomplete
                border="danger"
                todos={todos}
                handleCompleteTodo={handleCompleteTodo}
              />
            </Fragment>
          ))}
        </div>

        <div className="todos p-2">
          {completedTodos?.map((todo, i) => (
            <Fragment key={i}>
              <TodoComponent
                DeleteTodo={handleDeleteTodo1}
                Update={handleUpdateTodo1}
                todo={todo}
                Status="Completed"
                i={i}
                border="success"
                todos={completedTodos}
                handleCompleteTodo={handleIncompleteTodo}
              />
            </Fragment>
          ))}
        </div>
      </div> : <h1 className="d-flex align-items-center justify-content-center" style={{height:"70vh"}}>No Todos Found</h1>
      }

    </div>
  );
}

export default Todo;

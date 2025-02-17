import React, { useReducer, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

interface TodoComponentProps {
  todo: string;
  i: number;
  handleCompleteTodo: (index: number) => void;
  border: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
  DeleteTodo: (index: number) => void;
  Update: (index: number, newTodo: string) => void;
  Status: "Incomplete" | "Complete";
  incomplete: boolean;
}

const TodoComponent: React.FC<TodoComponentProps> = ({
  todo,
  i,
  handleCompleteTodo,
  border,
  DeleteTodo,
  Update,
  Status,
  incomplete,
}) => {
  const [newTodo, setNewTodo] = useState<string>(todo);
  const [edit, setEdit] = useReducer((show: boolean) => !show, false);

  const btnStyle = { margin: "auto", width: "100%" };
  const btnClass = "d-flex justify-content-center mt-2";

  const handleSubmit = (): void => {
    Update(i, newTodo);
    setEdit();
  };

  return (
    <Card
      key={i}
      border={border}
      className="ms-2 mt-3"
      style={{ width: "18rem" }}
    >
      <Card.Body>
        <Card.Title className="text-center">TODO</Card.Title>
        <Card.Subtitle className="mb-2 text-muted text-center">
          {Status}
        </Card.Subtitle>

        {edit ? (
          <>
            <Form.Control
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <Button
              variant="secondary"
              className={btnClass}
              style={btnStyle}
              onClick={handleSubmit}
            >
              Update
            </Button>
          </>
        ) : (
          <Card.Text style={{ height: "120px" }}>{todo}</Card.Text>
        )}

        {!edit && (
          <Button
            variant="secondary"
            className={btnClass}
            style={btnStyle}
            onClick={setEdit}
          >
            Edit
          </Button>
        )}

        <Button
          variant="danger"
          className={btnClass}
          style={btnStyle}
          onClick={() => DeleteTodo(i)}
        >
          Delete
        </Button>

        <Button
          variant="success"
          className={btnClass}
          style={btnStyle}
          onClick={() => handleCompleteTodo(i)}
        >
          {incomplete ? "Complete" : "Incomplete"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default TodoComponent;

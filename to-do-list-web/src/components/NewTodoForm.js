import React, { useReducer } from "react";
import uuid from 'react-uuid';
import "../components/NewTodoForm.css";

function NewTodoForm({ task, createTodo }) {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: ""
    }
  );

  const handleChange = evt => {
    setUserInput({ [evt.target.name]: evt.target.value });
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const newTodo = { id: uuid(), name: userInput.name, status: "Pending" };
    createTodo(newTodo);
    setUserInput({ name: "" });
  };

  return (
    <form className="NewTodoForm" onSubmit={handleSubmit}>
      <label htmlFor="task">New todo</label>
      <input
        value={userInput.name}
        onChange={handleChange}
        id="name"
        type="text"
        name="name"
        placeholder="New Todo"
      />
      <button disabled={!userInput.name}>Add Todo</button>
    </form>
  );
}

export default NewTodoForm;

import React, { useState } from "react";
import "../components/Todo.css";

function Todo({ todo, remove, update }) {
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(todo);

  const toggleFrom = () => {
    setIsEditing(!isEditing);
  };
  const handleUpdate = evt => {
    evt.preventDefault();
    update(todo.id, task);
    toggleFrom();
  };
  const handleChange = evt => {
   const { name, value } = evt.target;
   setTask(prevState => ({
                ...prevState,
                [name]: value
            }));
  };

  let result;
  if (isEditing) {
    result = (
      <div className="Todo">
        <form className="Todo-edit-form" onSubmit={handleUpdate}>
          <input onChange={handleChange} value={task.name} name="name" type="text" />
          <select name="status" id="status" onChange={handleChange} value={task.status}>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
          </select>
          <button>Save</button>
        </form>
      </div>
    );
  } else {
    result = (
      <div className="Todo">
        <li>
          {todo.name}
        </li>
        <li>
          {todo.status}
        </li>
       <div>
          <button onClick={toggleFrom}>Edit
          </button>
          </div>
      </div>
    );
  }
  return result;
}

export default Todo;

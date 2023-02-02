import React, { useState, useEffect } from "react";
import Todo from "../components/Todo.js";
import NewTodoForm from "../components/NewTodoForm.js";
import "../components/TodoList.css";

function TodoList() {
  const apiURL = 'http://localhost:5059/api/Task/';
  const [todos, setTodos] = useState([]);
 
  useEffect(() => {
      fetch(apiURL+'GetTasks')
        .then(response => response.json())
        .then(data => {
          let newArray = [];
          data.map(item => {
            let findStatus = newArray.findIndex(x => x.group == item.status)
            if(findStatus != -1) {
              newArray[findStatus]['records'].push(item);
            }
            else {
              newArray.push({group:item.status, records:[item]})
            }
          })
       
          let sortedData = data.sort(
            (a, b) => (a.status < b.status) ? 1 : (a.status > b.status) ? -1 : 0);        
          setTodos(sortedData);
        });
  }, [])


  const create = newTodo => {
    console.log(newTodo);
    setTodos([...todos, newTodo]);
    fetch(apiURL+"AddTask", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id:newTodo.id, name:newTodo.name, status:newTodo.status})
      })
    
  };

  const update = (id, updtedTask) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, name: updtedTask.name, status: updtedTask.status };
      }
      return todo;
    });
    setTodos(updatedTodos);
    fetch(apiURL+"EditTask", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id:updtedTask.id, name:updtedTask.name, status:updtedTask.status})
      })
  };


  const todosList = todos?.map(todo => (
    <Todo
      update={update}
      key={todo.id}
      todo={todo}
    />
  ));

  return (
    <div className="TodoList">
      <h1>
        Todo List
      </h1>
     { todos && <ul>{todosList}</ul> }
      <NewTodoForm createTodo={create} />
    </div>
  );
}

export default TodoList;

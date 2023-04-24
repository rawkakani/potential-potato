import { useEffect, useState } from "react";

const requestBody = {
  headers: {
    authorization: "Bearer test_key",
  },
};

const generateRequestBody = (body) => {
  return {
    ...requestBody,
    ...body
  }
}

const TodoItem = ({ todo, todoIndex, deleteTodoItem, updateTodoStatus }) => {
  return (
    <li key={todo.id}>
      {todo.title}
      <span>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => updateTodoStatus(todo.id, !todo.completed, todoIndex)}
        >
        </input>
      </span>
      <span>
        <button onClick={() => deleteTodoItem(todo.id, todoIndex)}>
          Delete
        </button>
      </span>
    </li>
  );
};

export function App() {
  const [Todos, setTodos] = useState([]);
  const [TodoItemText, setTodoItemText] = useState("");

  useEffect(() => {
    fetch("/api", requestBody)
      .then(async (res) => {
        const todoRes = await res.json();
        setTodos(todoRes);
      })
      .catch((err) => {
        console.log("something happened", err);
      });
  }, []);

  // update the todoList completed status
  const updateTodoStatus = (id, completed, todoIndex) => {
    const _requestBody = generateRequestBody({
      method: "PATCH",
      body: JSON.stringify({
        completed,
      })
    })

    fetch(`/api?id=${id}`, _requestBody)
      .then(async (res) => {
        const updatedRes = await res.json();

        // this is to handle the fact that the api mocks what was sent through
        Todos[todoIndex] = { ...Todos[todoIndex], ...updatedRes };
        setTodos([...Todos]);
      })
      .catch((err) => {
        console.log("something happened", err);
      });
  };

  // delete todoItem with todo it
  const deleteTodoItem = (id) => {
    const _requestBody = generateRequestBody({
      method: "DELETE",
    })

    fetch(`/api?id=${id}`, _requestBody)
      .then(async (res) => {
        if (res.status === 202) {
          const updatedTodos = Todos.filter((todo) => todo.id != id);
          setTodos([...updatedTodos]);
        }
      })
      .catch((err) => {
        console.log("something happened", err);
      });
  };

  // this is to create a new todo item
  const createTodoItem = () => {
    const _requestBody = generateRequestBody({
      method: "POST",
      body: JSON.stringify({ title: TodoItemText, completed: false })
    })
    fetch(`/api`, _requestBody)
      .then(async (res) => {
        if (res.status === 200) {
          const newTodo = await res.json();
          Todos.push(newTodo);
          setTodos([...Todos]);
        }
      })
      .catch((err) => {
        console.log("something happened", err);
      });
  };

  // search the todos that are on the server
  const searchTodoList = (searchText) => {
    // only start making requests to the server after three requests
 
    if (searchText.length > 2) {
      fetch(`/api?search=${searchText}`, requestBody)
        .then(async (res) => {
          const todoRes = await res.json();
          setTodos(todoRes);
        })
        .catch((err) => {
          console.log("something happened", err);
        });
    }
  };

  return (
    <>
      <h1>Todo App</h1>
      <input
        type={"text"}
        onChange={(e) => searchTodoList(e.target.value)}
        placeholder="search for specific todo item"
      >
      </input>
      {Todos.length > 0
        ? (
          <div>
            <ul>
              {Todos.map((todo, todoIndex) => {
                return (
                  <TodoItem
                    todo={todo}
                    todoIndex={todoIndex}
                    deleteTodoItem={deleteTodoItem}
                    updateTodoStatus={updateTodoStatus}
                  />
                );
              })}
            </ul>

            <div>
              <input
                type={"text"}
                value={TodoItemText}
                onChange={(e) => setTodoItemText(e.target.value)}
              >
              </input>
              <button onClick={createTodoItem}>Create Todo</button>
            </div>
          </div>
        )
        : <div>loading</div>}
    </>
  );
}

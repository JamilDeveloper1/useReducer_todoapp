import React, { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'SET_TODO':
      return {
        ...state,
        todo: action.value
      };

    case 'ADD_TODO':
      return {
        ...state,
        todo: '',
        todos: [...state.todos, { text: action.todo, completed: false }]
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((_, index) => index !== action.id)
      };

    case 'COMPLETED_TODO':
      return {
        ...state,
        todos: state.todos.map((item, index) =>
          index === action.id ? { ...item, completed: !item.completed } : item
        )
      };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, {
    todo: '',
    todos: []
  });

  const handleChange = (e) => {
    dispatch({
      type: 'SET_TODO',
      value: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: 'ADD_TODO',
      todo: state.todo
    });
  };

  const handleDelete = (id) => {
    dispatch({
      type: 'DELETE_TODO',
      id: id
    });
  };

  const handleComplete = (id) => {
    dispatch({
      type: 'COMPLETED_TODO',
      id: id
    });
  };

  return (
    <div className='container'>
      <h2>Todo App | useReducer()</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Add Your Todos...' onChange={handleChange} value={state.todo} />
        <button disabled={!state.todo} style={{opacity : !state.todo ? '.2' : '1'}} >Add</button>
      </form>
      <ul>
        {state.todos.map((item, index) => (
          <li key={index}>
            <div>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => handleComplete(index)}
              />
              <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
                {item.text}
              </span>
            </div>
            <button  onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

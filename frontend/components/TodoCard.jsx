import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/userContext.jsx";
import deleteTodo from '../apis/todos/deleteTodo.js'
import editTodo from "../apis/todos/editTodo.js";
function TodoCard({ id, todo, completed, edited, loading = false }) {
  const [edit, setEdit] = useState('');
  const [busy, setBusy] = useState(false);
  const { todo: td, setTodo, setMessage } = useContext(UserContext);

  const [editingText, setEditingText] = useState('');
  async function onDelete() {
    setBusy(true);
    try {
      const data = await deleteTodo(id);
      setTodo((curr) => curr.filter((single) => single._id !== id));
      setMessage(data.message);

    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  }
  function onEdit() {
    setEditingText(todo);
    setEdit(true);
  }
  async function putEdit() {
    setBusy(true);
    try {
      const data = await editTodo({ id, title: editingText, completed });
      setTodo((curr) => curr.map((item) => item._id === id ? { ...item, title: editingText, edited: true } : item));
      setMessage(data.message);
      setEdit(false);
    } catch (error) {
      setMessage(error.message);

    } finally {
      setBusy(false);
    }
  }
  useEffect(() => console.log(td), []);
  async function setComplete() {

    try {
      setTodo((prev) => {
        return prev.map((e) => e._id == id ? { ...e, completed: !e.completed } : e);
      })
      
      const data = await editTodo({ id, title: todo, completed: !completed });

      setMessage(data.message);
    } catch (error) {
      console.log(error)
    }
  }
  if (loading) {
    return (
      <div className="todo-card todo-card-loading" aria-hidden="true">
        <div className="todo-skeleton-line" />
        <div className="todo-skeleton-actions" />
      </div>
    );
  }

  return (
    <div onClick={(e) => { e.stopPropagation; setComplete() }} className={`todo-card${busy ? " todo-card-busy" : ""} ${completed ? "completed" : ""}`} aria-busy={busy}>
      <div className="todo">
        {
          edit ?
            <input type="text"
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
            /> :
            <p>{todo}</p>
        }


      </div>

      <div>
        {
          edit ? <><button
            className="delete-btn"
            onClick={() => setEdit(false)}
            aria-label="cancel todo"
            disabled={busy}
          >
            ×
          </button>
            <button
              className="delete-btn"
              onClick={putEdit}
              aria-label="Edit todo"
              disabled={busy}
            >
              Y
            </button></>
            : <>
              <button
                className="delete-btn"
                onClick={onDelete}
                aria-label="Delete todo"
                disabled={busy}
              >
                ×
              </button>
              <button
                className="delete-btn"
                onClick={onEdit}
                aria-label="Edit todo"
                disabled={busy}
              >
                ✎
              </button></>
        }
      </div>

    </div>
  )
}

export default TodoCard

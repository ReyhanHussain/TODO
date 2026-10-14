import { useContext, useState } from "react"
import { UserContext } from "../context/userContext.jsx";
import deleteTodo from '../apis/todos/deleteTodo.js'
import editTodo from "../apis/todos/editTodo.js";
function TodoCard({ id, todo, completed, edited, loading = false }) {
  const [edit, setEdit] = useState('');
  const [deleting, setDeleting] = useState(false);
  const { setTodo, setMessage } = useContext(UserContext);

  const [editingText, setEditingText] = useState('');
  async function onDelete() {
    setDeleting(true);
    try {
      const data = await deleteTodo(id);
      setTodo((curr) => curr.filter((single) => single._id !== id));
      setMessage(data.message);

    } catch (error) {
      setMessage(error.message);
    } finally {
      setDeleting(false);
    }
  }
  function onEdit() {
    setEditingText(todo);
    setEdit(true);
  }
  async function putEdit() {
    try {
      const data = await editTodo({ id, title: editingText, completed });
      setTodo((curr) => curr.map((item) => item._id === id ? { ...item, title: editingText, edited: true } : item));
      setMessage(data.message);
      setEdit(false);
    } catch (error) {
      setMessage(error.message);

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
    <div className={`todo-card${deleting ? " todo-card-deleting" : ""}`} aria-busy={deleting}>
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
          >
            ×
          </button>
            <button
              className="delete-btn"
              onClick={putEdit}
              aria-label="Edit todo"
            >
              Y
            </button></>
            : <>
              <button
                className="delete-btn"
                onClick={onDelete}
                aria-label="Delete todo"
                disabled={deleting}
              >
                ×
              </button>
              <button
                className="delete-btn"
                onClick={onEdit}
                aria-label="Edit todo"
                disabled={deleting}
              >
                ✎
              </button></>
        }
      </div>

    </div>
  )
}

export default TodoCard

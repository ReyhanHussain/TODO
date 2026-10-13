import { useState } from "react"

function TodoCard({ todo }) {
  const [edit, setEdit] = useState('');
  const [editingText, setEditingText] = useState('');
  function onDelete() {
    
  }
  function onEdit() {
    setEditingText(todo)
    setEdit(true);
  }
  function putEdit() {
    setEdit(false);
  }
  return (
    <div className="todo-card" >
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
              >
                ×
              </button>
              <button
                className="delete-btn"
                onClick={onEdit}
                aria-label="Edit todo"
              >
                ✎
              </button></>
        }
      </div>

    </div>
  )
}

export default TodoCard

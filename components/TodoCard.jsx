
function TodoCard({todo}) {
  return (
    <div className="todo-card">
        <div className="todo">
          <span>X</span>
        <p>{todo}</p>
        </div>
    </div>
  )
}

export default TodoCard

import { useState } from "react"
import TodoCard from "./components/TodoCard"

function App() {
    const [text, setText] = useState('');
    const [completed, setCompleted] = useState(4);
    const [user, setUser] = useState({
        name: "RH",
        email: "reyhan@gmx.com",
    })
    const [models, setModels] = useState([
        "gemini-3.1 pro",
        "claude-opus 5.1"
    ])
    const [todos, setTodos] = useState([
        {
            id: 1,
            todo: "Review DSA notes",
            completed: false,
        },
        {
            id: 2,
            todo: "Solve two LeetCode problems",
            completed: false,
        },
        {
            id: 3,
            todo: "Practice React Context API",
            completed: true,
        },
        {
            id: 4,
            todo: "Improve todo app CSS",
            completed: false,
        },
        {
            id: 5,
            todo: "Revise DBMS Module 4",
            completed: false,
        },
        {
            id: 6,
            todo: "Build login and signup pages",
            completed: false,
        },
        {
            id: 7,
            todo: "Update GitHub README",
            completed: true,
        },
        {
            id: 8,
            todo: "Practice JavaScript promises",
            completed: false,
        },
        {
            id: 9,
            todo: "Organize project components",
            completed: false,
        },
        {
            id: 10,
            todo: "Plan tomorrow's tasks",
            completed: false,
        },
    ]);
    return (
        <main>
            <header >
                <h1>Task / List</h1>
                <div className="login-name">
                    <p>|</p>
                    <p title={user?.email}>{user?.name}</p>
                    <button>{!user?"LOGIN":"LOGOUT"}</button>
                </div>
            </header>
            <div className="textArea">
                <textarea type="text" placeholder="Whats need to get done?" />
                <div>
                    <div className="add-ai-btns">
                        <button>ADD</button>
                        <button>AI++</button>
                    </div>
                    <div>
                        <select>
                            {
                                models.map((single, i) => <option key={i} value="gemini">{single}</option>)
                            }
                        </select>
                    </div>
                </div>
            </div>
            <section className="heading-text-div">
                <header>
                    <div>
                        <span>{todos.length}</span>

                        <p>| TASKS</p>
                    </div>
                    <div className="progress-div">
                        <span>{completed}/{todos.length} Complete</span>
                        <div className="progress-bar">
                            <span
                                style={{
                                    backgroundColor: "whitesmoke",
                                    width: `${(completed / todos.length) * 100}%`,
                                }}
                            />
                        </div>
                    </div>
                </header>
                <section className="todo-list">
                    <TodoCard todo={'read Dsa Notes'}></TodoCard>
                    <TodoCard todo={'read Dsa Notes'}></TodoCard>
                    <TodoCard todo={'read Dsa Notes'}></TodoCard>
                    <TodoCard todo={'read Dsa Notes'}></TodoCard>
                    <TodoCard todo={'read Dsa Notes'}></TodoCard>
                    <TodoCard todo={'read Dsa Notes'}></TodoCard>
                    <TodoCard todo={'read Dsa Notes'}></TodoCard>
                    <TodoCard todo={'read Dsa Notes'}></TodoCard>
                    <TodoCard todo={'read Dsa Notes'}></TodoCard>
                    <TodoCard todo={'read Dsa Notes'}></TodoCard>
                    <TodoCard todo={'read Dsa Notes'}></TodoCard>
                    <TodoCard todo={'read Dsa Notes'}></TodoCard>
                    <TodoCard todo={'read Dsa Notes'}></TodoCard>

                </section>
            </section>

        </main>
    )
}

export default App

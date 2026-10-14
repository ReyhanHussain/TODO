
import {
    createContext,
    useState
} from "react";

export const UserContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const [todo, setTodo] = useState([]);
    return (
        <UserContext.Provider value={{ user, setUser, setTodo, message, setMessage, todo }}>
            {children}
        </UserContext.Provider>
    )

}

import {
    BrowserRouter,

} from "react-router";

import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/userContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
               <AppRoutes/>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;

import getMe from '../apis/auth/me';
import { Route, Routes, Navigate } from 'react-router';
import MainPage from "../pages/MainPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import Loader from '../pages/Loader';
import NotFound from '../pages/NotFound';
function AppRoutes() {
    const { setUser, setTodo, user } = useContext(UserContext);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data, Tododata } = await getMe();

                if (data.user) {
                    setUser((currentUser) => currentUser ?? data.user);
                }
                if (Tododata) {
                    setTodo(Tododata.todo);
                }

            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };

        fetchUser();
    }, [user]);

    return (
        <Routes>
            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

            <Route
                path="/home"
                element={<MainPage />}
            />
            <Route
                path="/Loader"
                element={<Loader />}
            />
            <Route
                path="*"
                element={<NotFound />}
            />

            <Route
                path="/register"
                element={<RegisterPage />}
            />

            <Route
                path="/login"
                element={<LoginPage />}
            />

            <Route
                path="/tasks"
                element={<MainPage />}
            />
        </Routes>
    );
}

export default AppRoutes

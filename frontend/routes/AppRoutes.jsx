import getMe from '../apis/auth/me';
import { Route, Routes, Navigate } from 'react-router';
import MainPage from "../pages/MainPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import Loader from '../pages/Loader';
import NotFound from '../pages/NotFound';
function AppRoutes() {
    const { setUser, setTodo, user, loader } = useContext(UserContext);
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data, Tododata } = await getMe();
                setUser(data.user);
                setTodo(Tododata.todo);
            } catch (error) {
                setUser(null);
                setTodo([]);
                if (error.status !== 401) {
                    console.error("Failed to restore login:", error);
                }
            } finally {
                setCheckingAuth(false);
            }
        };

        fetchUser();
    }, [setUser, setTodo]);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    checkingAuth
                        ? <Loader />
                        : <Navigate to={"/home"} replace />
                }
            />

            <Route
                path="/home"
                element={<MainPage loading={checkingAuth} />}
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
                element={
                    checkingAuth || loader
                        ? <Loader />
                        : user
                            ? <Navigate to="/home" replace />
                            : <RegisterPage />
                }
            />

            <Route
                path="/login"
                element={
                    checkingAuth || loader
                        ? <Loader />
                        : user
                            ? <Navigate to="/home" replace />
                            : <LoginPage />
                }
            />

            <Route
                path="/tasks"
                element={<MainPage loading={checkingAuth} />}
            />
        </Routes>
    );
}

export default AppRoutes

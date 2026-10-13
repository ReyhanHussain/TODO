import getMe from '../apis/me';
import { Route, Routes,Navigate  } from 'react-router';
import MainPage from "../pages/MainPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/userContext';
function AppRoutes() {
    const { setUser } = useContext(UserContext);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data =  await getMe();
                if (data.user) {
                    setUser((currentUser) => currentUser ?? data.user);
                }
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };

        fetchUser();
    }, [setUser]);

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

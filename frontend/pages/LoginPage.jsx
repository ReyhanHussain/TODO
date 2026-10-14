
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import "../registerPage.css";
import { UserContext } from "../context/userContext";
import loginApi from "../apis/auth/loginApi";

function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const { setUser,setTodo, loader, setLoader} = useContext(UserContext);
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        setMessage("");
        setError(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError(true);
            setLoader(true);
            const data = await loginApi(formData);
            setTodo([]);
            setUser(data.user);
            setMessage(data.message);
            setError(false);
            navigate('/home')

        } catch (error) {
            setMessage(error.message || "Unable to connect to the server.");
            setError(true);
        } finally {
            setLoader(false);
        }
    };

    return (
        <main className="register-page">
            <section className="register-card">

                {/* Header */}
                <header className="register-header">
                    <div className="register-title">
                        <Link className="auth-back-link" to="/home">← BACK TO TASKS</Link>
                        <h1>Task / Login</h1>
                        <p>Welcome back. Sign in to continue.</p>
                    </div>

                    <span className="register-label">
                        EXISTING USER
                    </span>
                </header>

                {/* Login Form */}
                <form
                    className="register-form"
                    onSubmit={handleSubmit}
                >
                    <div className="register-field">
                        <label htmlFor="email">
                            EMAIL ADDRESS
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter email address"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="register-field">
                        <label htmlFor="password">
                            PASSWORD
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    {message && (
                        <p
                            className={`register-message ${
                                error ? "is-error" : "is-success"
                            }`}
                            role="status"
                        >
                            {message}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="register-button"
                    >
                        LOGIN TO ACCOUNT
                        <span aria-hidden="true">→</span>
                    </button>
                </form>

                {/* Footer */}
                <footer className="register-footer">
                    <span>NEW TO TASK MANAGER?</span>

                    <Link to="/register">
                        CREATE ACCOUNT
                    </Link>
                </footer>

                {/* Bottom Metadata */}
                <div className="register-bottom-line">
                    <span>TASK MANAGER</span>
                    <span>ACCOUNT / 02</span>
                </div>

            </section>
        </main>
    );
}

export default LoginPage;

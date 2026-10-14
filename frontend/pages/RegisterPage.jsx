
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import "../registerPage.css";
import { UserContext } from '../context/userContext'

function RegisterPage() {
    const { setUser, setTodo, loader, setLoader } = useContext(UserContext);

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);

    const API_URL = process.env.PARCEL_BACKEND_URL;

    async function register() {
        try {
            setLoader(true);
            const response = await fetch(
                `${API_URL}/api/v1/auth/register`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: formData.username,
                        email: formData.email,
                        password: formData.password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Registration failed"
                );
            }

            setMessage(
                data.message || "Registration successful!"
            );
            setTodo([]);
            setUser(data.user);
            setError(false);
            navigate('/home')
        } catch (error) {
            console.log("Registration error:", error);

            setMessage(
                error.message || "Unable to connect to the server"
            );
            setError(true);
        }
        finally {
            setLoader(false);

        }

    }
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

        if (formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match.");
            setError(true);
            return;
        }

        await register();
    };

    return (
        <main className="register-page">
            <section className="register-card">

                <header className="register-header">
                    <div className="register-title">
                        <Link className="auth-back-link" to="/home">← BACK TO TASKS</Link>
                        <h1>Task / Register</h1>
                        <p>Create your account to get started.</p>
                    </div>

                    <span className="register-label">
                        NEW USER
                    </span>
                </header>

                {/* Registration Form */}
                <form
                    className="register-form"
                    onSubmit={handleSubmit}
                >
                    <div className="register-field">
                        <label htmlFor="username">
                            USERNAME
                        </label>

                        <input
                            id="username"
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            value={formData.username}
                            onChange={handleChange}
                            autoComplete="username"
                            minLength={3}
                            required
                        />
                    </div>

                    <div className="register-field">
                        <label htmlFor="email">
                            EMAIL ADDRESS
                        </label>

                        <input
                            id="email"
                            type="email"
                            name="email"
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
                            type="password"
                            name="password"
                            placeholder="Create password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                            minLength={8}
                            required
                        />

                        <span className="register-hint">
                            Minimum 8 characters
                        </span>
                    </div>

                    <div className="register-field">
                        <label htmlFor="confirmPassword">
                            CONFIRM PASSWORD
                        </label>

                        <input
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            placeholder="Repeat password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            autoComplete="new-password"
                            minLength={8}
                            required
                        />
                    </div>

                    {/* Validation message */}
                    {message && (
                        <p
                            className={`register-message ${error ? "is-error" : "is-success"
                                }`}
                            role="status"
                        >
                            {message}
                        </p>
                    )}

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="register-button"
                    >
                        CREATE ACCOUNT
                        <span aria-hidden="true">→</span>
                    </button>
                </form>

                {/* Footer */}
                <footer className="register-footer">
                    <span>ALREADY HAVE AN ACCOUNT?</span>

                    <Link to="/login">
                        LOGIN
                    </Link>
                </footer>

                {/* Bottom metadata */}
                <div className="register-bottom-line">
                    <span>TASK MANAGER</span>
                    <span>ACCOUNT / 01</span>
                </div>

            </section>
        </main>
    );
}

export default RegisterPage;

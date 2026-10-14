
import { Link } from "react-router";
import "./NotFound.css";

function NotFound() {
    return (
        <div className="not-found-screen">
            <header className="not-found-header">
                <div className="not-found-brand">
                    <span className="not-found-brand-mark">T/</span>
                    <span>Task / List</span>
                </div>

                <span className="not-found-label">
                    ERROR <span>404</span>
                </span>
            </header>

            <section className="not-found-content">
                <div className="not-found-code">
                    <span>4</span>
                    <span className="not-found-zero">0</span>
                    <span>4</span>
                </div>

                <p className="not-found-eyebrow">
                    PAGE NOT FOUND
                </p>

                <h1>Looks like you're lost.</h1>

                <p className="not-found-description">
                    The page you're looking for doesn't exist,
                    may have been moved, or is temporarily unavailable.
                </p>

                <div className="not-found-actions">
                    <Link to={'/home'}
                        type="button"
                        className="not-found-home-button"
                    >
                        <span aria-hidden="true">←</span>
                        BACK TO HOME
                    </Link>
                </div>

                <span className="not-found-reference">
                    ERROR_CODE: 404 / RESOURCE_NOT_FOUND
                </span>
            </section>

            <footer className="not-found-footer">
                <span>TASK / LIST</span>
                <span>NOT ALL PATHS LEAD SOMEWHERE.</span>
            </footer>
        </div>
    );
}

export default NotFound;

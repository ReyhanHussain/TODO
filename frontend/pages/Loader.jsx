
import "./Loader.css";

function Loader() {
    return (
        <div
            className="loader-screen"
            role="status"
            aria-live="polite"
            aria-busy="true"
        >
            <div className="loader-brand">
                <span className="loader-brand-mark">T/</span>
                <span>Task / List</span>
            </div>

            <div className="loader-content">
                <div className="loader-animation" aria-hidden="true">
                    <div className="loader-spinner"></div>
                    <span className="loader-spinner-center">T/</span>
                </div>

                <p className="loader-eyebrow">
                    PERSONAL WORKSPACE
                </p>

                <h1>
                    Preparing your workspace
                    <span className="loader-dots">...</span>
                </h1>

                <p className="loader-description">
                    Getting everything ready for you.
                </p>

                <div
                    className="loader-progress"
                    aria-hidden="true"
                >
                    <span className="loader-progress-fill"></span>
                </div>

                <div className="loader-status">
                    <span className="loader-status-dot"></span>
                    <span>INITIALIZING</span>
                    <span className="loader-status-divider">/</span>
                    <span>PLEASE WAIT</span>
                </div>
            </div>

            <div className="loader-footer">
                <span> TASK / LIST </span>
                <span>V.01</span>
            </div>
        </div>
    );
}

export default Loader;

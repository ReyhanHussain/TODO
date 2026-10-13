async function logoutApi() {
    const API_URL = process.env.PARCEL_BACKEND_URL;
    const response = await fetch(
        `${API_URL}/api/v1/auth/logout`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Logout failed.");
    }

    return data;
}

export default logoutApi

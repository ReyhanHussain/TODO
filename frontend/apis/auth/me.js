async function getMe() {
    const API_URL = process.env.PARCEL_BACKEND_URL;
    const response = await fetch(
        `${API_URL}/api/v1/auth/me`,
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
        const error = new Error(data.message || "Unable to check your login.");
        error.status = response.status;
        throw error;
    }

    const allTodoResponse = await fetch(
        `${API_URL}/api/v1/todo/get`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    const Tododata = await allTodoResponse.json();

    if (!allTodoResponse.ok) {
        const error = new Error(Tododata.message || "Unable to load your todos.");
        error.status = allTodoResponse.status;
        throw error;
    }

    return { data, Tododata };
}

export default getMe;
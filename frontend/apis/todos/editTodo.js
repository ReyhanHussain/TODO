async function editTodo({id, title, completed}) {
    const API_URL = process.env.PARCEL_BACKEND_URL;
    const response = await fetch(
        `${API_URL}/api/v1/todo/edit`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id,
                title, 
                completed
            })
        }

    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "todo DELETE/ failed.");
    }

    return data;
}

export default editTodo

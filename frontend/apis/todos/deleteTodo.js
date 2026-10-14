async function deleteTodo(params) {
    const API_URL = process.env.PARCEL_BACKEND_URL;
    const response = await fetch(
        `${API_URL}/api/v1/todo/delete`,
        {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: params,
            })
        }

    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "todo DELETE/ failed.");
    }

    return data;
}

export default deleteTodo

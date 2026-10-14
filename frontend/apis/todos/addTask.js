async function addTask(params) {
    const API_URL = process.env.PARCEL_BACKEND_URL;
    const response = await fetch(
        `${API_URL}/api/v1/todo/add`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: params,
            })
        }

    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "todo GET/ failed.");
    }

    return data;
}

export default addTask

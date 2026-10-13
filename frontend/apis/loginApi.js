async function  loginApi(params) {
    const API_URL = process.env.PARCEL_BACKEND_URL;
    const response = await fetch(
        `${API_URL}/api/v1/auth/login`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }, 
            body:JSON.stringify(params)
        }
        
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Login failed.");
    }

    return data;
}

export default loginApi

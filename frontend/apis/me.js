async function getMe() {
    try {
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
        console.log('getme func : ', data);
        return data;

    } catch (error) {
        console.error("authentication error:", error);

    }
}

export default getMe;
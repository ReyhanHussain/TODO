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

        //fetch all the todos 

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

        console.log('getme user func : ', data);
        console.log('getme allTodos func : ', Tododata);
        return {data, Tododata};

    } catch (error) {
        console.log("authentication error:", error);
        
    }
}

export default getMe;
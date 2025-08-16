// save a user to MongoDB
export const saveUser = async (userInfo) => {
    try {
        const response = await fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        });

        // optionally, return response data without logging
        const data = await response.json();
        return data;

    } catch (error) {
        // handle errors silently or throw
        console.error('Error saving user:', error);
        throw error;
    }
};

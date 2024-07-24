const getUserFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
};

export default getUserFromLocalStorage;
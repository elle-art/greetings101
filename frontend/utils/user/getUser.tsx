const getUserFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
              return JSON.parse(storedUser);
            } catch (error) {
              console.error('Error parsing stored user:', error);
              return null;
            }
        }
    }
    return null;
};

export default getUserFromLocalStorage;
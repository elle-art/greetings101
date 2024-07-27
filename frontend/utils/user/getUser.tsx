const getUserFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  }
  return null;
};

export const getMode = () =>{
  if (typeof window !== 'undefined') {
  const pref = localStorage.getItem('colorMode');
  return pref ? JSON.stringify(pref) : null;
}
return null;
};

export default getUserFromLocalStorage;
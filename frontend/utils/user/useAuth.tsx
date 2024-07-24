import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import getUserFromLocalStorage from './getUser';

const useAuth = () => {
    const [user, setUser] = useState(null); 
    const router = useRouter(); 

    useEffect(() => {
        const storedUser = getUserFromLocalStorage();
        if (storedUser) {
            setUser(storedUser); 
        } else {
            if (!localStorage.getItem('logoutStatus')) {
            router.push('/');  // If no user is found, redirect to login page
            }
        }
    }, [router]);

    return user;
};

export default useAuth;
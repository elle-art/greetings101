import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from './UserContext';

const useAuth = () => {
    const { user } = useUser();
    const router = useRouter(); 

    useEffect(() => {
        if (!user && !((location.pathname === '/pages/Login') || !(location.pathname === '/pages/Signup'))) {
            router.push('/');  // If no user is found, redirect to login page
        }
    }, [user, router]);

    return user;
};

export default useAuth;
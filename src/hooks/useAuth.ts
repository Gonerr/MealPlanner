import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';

interface User {
    id:string;
    email: string;
    role?: string;
}

export function useAuth() {
    const [user, setUser] = useState<User | null> (null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const checkAuth = async () => {
        try {
            const response = await fetch('/api/auth/me');

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => { 
        await fetch('/api/auth/logout', {method: 'POST'});
        setUser(null);
        router.push('/login');
    }

    useEffect(() => {
        checkAuth();
    },[])

    return {user, loading, logout, checkAuth};
}
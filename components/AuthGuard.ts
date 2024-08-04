import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(true);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setAuthenticated(true);
        } else {
            router.push('/login');
        }
    }, []);

    if (!authenticated) {
        return null;
    }

    return children;
};

export default AuthGuard;

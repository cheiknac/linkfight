import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import type { User } from './AuthContext';

const API_URL = import.meta.env.VITE_API_URL;

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let ignore = false;

        async function fetchCurrentUser() {
            const token = localStorage.getItem('token');

            if (!token) {
                if (!ignore) setIsLoading(false);
                return;
            }

            try {
                const res = await fetch(`${API_URL}/users/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = res.ok ? await res.json() : null;
                if (!ignore) setUser(data);
            } finally {
                if (!ignore) setIsLoading(false);
            }
        }

        fetchCurrentUser();

        return () => {
            ignore = true;
        };
    }, []);

    function logout() {
        localStorage.removeItem('token');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
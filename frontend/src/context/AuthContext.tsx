import { createContext } from 'react';

export interface User {
    id: number;
    slug: string;
    firstname: string;
    lastname: string;
    email: string;
    type: string;
}

export interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    setUser: (user: User | null) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
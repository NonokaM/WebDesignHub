import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const AuthFlagContext = createContext({});

export const AuthFlagProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, user => {
            setIsAuth(!!user);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthFlagContext.Provider value={{ isAuth, setIsAuth }}>
            {children}
        </AuthFlagContext.Provider>
    );
};

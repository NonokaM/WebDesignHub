import { createContext } from "react";

export const AuthFlagContext = createContext({});

export const AuthFlagProvider = prps => {
    const { children } = prps;

    const sampleObj = { sampleValue: 'テスト' };

    return (
        <AuthFlagContext.Provider value={sampleObj}>
            {children}
        </AuthFlagContext.Provider>
    );
};

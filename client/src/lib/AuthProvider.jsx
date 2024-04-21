import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const localStorageUser = localStorage.getItem("user");

        if (localStorageUser) {
            return JSON.parse(localStorageUser);
        } else {
            return null;
        }
    });

    useEffect(() => {
        console.log("useEffect wird aufgerufen");

        if (user !== null || user !== undefined) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    const contextValue = {
        user,
        setUser,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Eigenen Hook
export const useAuth = () => {
    return useContext(AuthContext);
};

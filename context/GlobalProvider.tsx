import React, {createContext, useContext, useEffect, useState} from "react";
import auth, {FirebaseAuthTypes} from "@react-native-firebase/auth";
import User = FirebaseAuthTypes.User;

type GlobalContextType = {
    isLoggedIn: boolean;
    user: User | null | undefined;
    isLoading: boolean;
    setIsLoggedIn: (value: boolean) => void;
    setUser: (value: User) => void;
    setIsLoading: (value: boolean) => void;
}

type ContextProps = {
    children: React.ReactNode;
};

const defaultValues: GlobalContextType = {
    isLoggedIn: false,
    user: null,
    isLoading: true,
    setIsLoggedIn: () => {},
    setUser: () => {},
    setIsLoading: () => {}
};

const GlobalContext = createContext<GlobalContextType>(defaultValues);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children } : ContextProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            auth().onAuthStateChanged((user) => {
                if (user) {
                    setUser(user);
                    setIsLoggedIn(true);
                    console.log(user)
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            });
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                user,
                isLoading,
                setIsLoggedIn,
                setUser,
                setIsLoading
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
import React, {createContext, useContext, useEffect, useState} from "react";
import auth, {FirebaseAuthTypes} from "@react-native-firebase/auth";


type GlobalContextType = {
    isLoggedIn: boolean;
    user: FirebaseAuthTypes.User | null | undefined;
    isLoading: boolean;
    setIsLoggedIn: (value: boolean) => void;
    setUser: (value: FirebaseAuthTypes.User | null) => void;
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
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            auth().onAuthStateChanged((user) => {
                console.log("user run onAuthStateChanged")
                if (user) {
                    setUser(user);
                    setIsLoggedIn(true);
                    console.log(user)
                    // user.getIdToken().then(token => {
                    //     console.log("token")
                    //     console.log(token)
                    // })
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
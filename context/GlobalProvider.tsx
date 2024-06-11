import React, {createContext, useContext, useEffect, useState} from "react";
import auth, {FirebaseAuthTypes} from "@react-native-firebase/auth";


type GlobalContextType = {
    isLoggedIn: boolean;
    userLogin: FirebaseAuthTypes.User | null | undefined;
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
    userLogin: null,
    isLoading: true,
    setIsLoggedIn: () => {},
    setUser: () => {},
    setIsLoading: () => {}
};

const GlobalContext = createContext<GlobalContextType>(defaultValues);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children } : ContextProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userLogin, setUser] = useState<FirebaseAuthTypes.User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            auth().onAuthStateChanged((user) => {
                console.log("user run onAuthStateChanged")
                if (user) {
                    // user.getIdTokenResult()
                    //     .then((token) => {
                    //         console.log("token")
                    //         console.log(token.claims)
                    //     })
                    setUser(user);
                    setIsLoggedIn(true);
                    setIsLoading(false);
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                    setIsLoading(false);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                userLogin,
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
import React, {createContext, useContext, useEffect, useState} from "react";
import auth, {FirebaseAuthTypes} from "@react-native-firebase/auth";
import {axiosInstance} from "@/lib/axios";


type GlobalContextType = {
    isLoggedIn: boolean;
    userLogin: FirebaseAuthTypes.User | null | undefined;
    isLoading: boolean;
    setIsLoggedIn: (value: boolean) => void;
    setUser: (value: FirebaseAuthTypes.User | null) => void;
    setIsLoading: (value: boolean) => void;
    userId?: string | null;
}

type ContextProps = {
    children: React.ReactNode;
};

const defaultValues: GlobalContextType = {
    isLoggedIn: false,
    userLogin: null,
    isLoading: true,
    userId: null,
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
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        try {
            auth().onAuthStateChanged((user) => {
                console.log("user run onAuthStateChanged")
                if (user) {
                    setUser(user);
                    setIsLoggedIn(true);
                    setIsLoading(false);
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                    setIsLoading(false);
                }
            });

            getUserInform().catch(e => console.log(e));
        } catch (error) {
            console.log(error);
        }
    }, []);

    const getUserInform = async () => {
        const data = await axiosInstance.post(
            'users/firebase-id',
            {
                firebaseId: userLogin?.uid
            }
        );
        if (!data.data.value.dateOfBirth) {
            data.data.value.dateOfBirth = new Date();
        }
        setUserId(data.data.value.id);
    }

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                userLogin,
                isLoading,
                userId,
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
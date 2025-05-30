import React, {createContext, useContext, useEffect, useRef, useState} from "react";
import auth, {FirebaseAuthTypes} from "@react-native-firebase/auth";
import {axiosInstance} from "@/lib/axios";


type GlobalContextType = {
    isLoggedIn: boolean;
    userLogin: FirebaseAuthTypes.User | null;
    isLoading: boolean;
    setIsLoggedIn: (value: boolean) => void;
    setUser: (value: FirebaseAuthTypes.User) => void;
    setIsLoading: (value: boolean) => void;
    userId?: string | null;
    expoPushToken: string;
    setExpoPushToken: (value: string) => void;
    userFullName: string;
}

type ContextProps = {
    children: React.ReactNode;
};

const defaultValues: GlobalContextType = {
    isLoggedIn: false,
    userLogin: null,
    isLoading: true,
    userId: null,
    expoPushToken: '',
    userFullName: '',
    setIsLoggedIn: () => {},
    setUser: () => {},
    setIsLoading: () => {},
    setExpoPushToken: () => {},
};

const GlobalContext = createContext<GlobalContextType>(defaultValues);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children } : ContextProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userLogin, setUser] = useState<FirebaseAuthTypes.User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);
    const [userFullName, setUserFullName] = useState<string>('');
    const [expoPushToken, setExpoPushToken] = useState('');

    useEffect(() => {
        try {
            auth().onAuthStateChanged((user) => {
                console.log("user run onAuthStateChanged")
                if (user) {
                    setUser(user);
                    setIsLoggedIn(true);
                    setIsLoading(false);
                    getUserInform(user?.uid)
                        .catch(e => console.log(e));
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

    const updateDeviceToken = async (userId: string ,token: string) => {
        if (token === '' || userId === '') return;
        const data = await axiosInstance.post(
            'users/device-token',
            {
                userId: userId,
                deviceToken: token
            }
        );
    }

    const getUserInform = async (userId: string) => {
        const data = await axiosInstance.post(
            'users/firebase-id',
            {
                firebaseId: userId
            }
        );
        if (!data.data.value.dateOfBirth) {
            data.data.value.dateOfBirth = new Date();
        }
        setUserFullName(data.data.value.fullName);
        setUserId(data.data.value.id);
        return data.data.value;
    }

    updateDeviceToken(userId ?? '', expoPushToken)
        .catch(e => console.log(e));
    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                userLogin,
                isLoading,
                userId,
                expoPushToken,
                userFullName,
                setIsLoggedIn,
                setUser,
                setIsLoading,
                setExpoPushToken
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
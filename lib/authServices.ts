import auth from "@react-native-firebase/auth";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import {Alert} from "react-native";
import {router} from "expo-router";

export const CheckUserRole = async () => {

    const idTokenResult = await auth().currentUser?.getIdTokenResult();
    const isCustomer = idTokenResult?.claims.Role === 'Customer';
    console.log(idTokenResult?.claims.Role);
    if (!isCustomer) {
        await auth().signOut();
        if (GoogleSignin.hasPreviousSignIn()) {
            await GoogleSignin.signOut();
        }
        Alert.alert('Error', 'You are not allowed to access this app');
        return false;
    }
    return true;
}

export const getUserToken = async () => {
    const token = await auth().currentUser?.getIdToken();
    if (!token) {
        await auth().signOut();
        if (GoogleSignin.hasPreviousSignIn()) {
            await GoogleSignin.signOut();
        }
        Alert.alert('Error', 'Token is invalid');
        router.push('(auth)/sign-in');
        return '';
    }
    return token;
}
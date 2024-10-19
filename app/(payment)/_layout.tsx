import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import OrderScreen from "@/app/(payment)/OrderScreen";
import ResultScreen from "@/app/(payment)/ResultScreen";
import * as Linking from "expo-linking";
import {Stack} from "expo-router";

const PaymentLayout = () => {
    const prefix = Linking.createURL("/");
    console.log("PaymentLayout");

    const linking = {
        prefixes: [
            'pickle-ball://',
            prefix
        ],
        config: {
            screens: {
                ResultScreen: '(payment)/ResultScreen',
                ConfirmOrder: '(payment)/ConfirmOrder',
                OrderScreen: '(payment)/OrderScreen',
                NotFound: '*',
            },
        }
    }

    return (

            <Stack
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="OrderScreen" options={{
                    headerShown: false
                }} />
                <Stack.Screen name="ResultScreen" options={{
                    headerShown: false
                }} />
                <Stack.Screen name="ConfirmOrder" options={{
                    headerShown: false
                }} />
            </Stack>

    );
};

export default PaymentLayout;
import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import OrderScreen from "@/app/(payment)/OrderScreen";
import ResultScreen from "@/app/(payment)/ResultScreen";
import * as Linking from "expo-linking";
import {Stack} from "expo-router";

const PaymentLayout = () => {
    const prefix = Linking.createURL("/");
    console.log("prefix", prefix);

    const linking = {
        prefixes: [
            'pickle-ball://',
            prefix
        ],
        config: {
            screens: {
                OrderScreen: '(shop)/shop',
                ResultScreen: '(payment)/ResultScreen',
                NotFound: '*',
            },
        }
    }

    return (
        <NavigationContainer
            linking={linking}
            independent={true}
        >
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
            </Stack>
        </NavigationContainer>
    );
};

export default PaymentLayout;
import React from 'react';
import {Stack} from "expo-router";
import * as Linking from "expo-linking";
import {NavigationContainer} from "@react-navigation/native";

const OrderLayout = () => {

    return (
        <Stack>
            <Stack.Screen
                name="order"
                options={{
                    title: 'Order',
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="[id]"
                options={{
                    title: 'Chi tiết giao dịch',
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: 'white'
                    }
                }}
            />
        </Stack>
    );
};


export default OrderLayout;
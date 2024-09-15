import React from 'react';
import {Stack} from "expo-router";

const OrderLayout = () => {
    console.log("OrderLayout run");

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
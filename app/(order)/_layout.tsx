import React from 'react';
import {Stack} from "expo-router";

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
        </Stack>
    );
};

export default OrderLayout;
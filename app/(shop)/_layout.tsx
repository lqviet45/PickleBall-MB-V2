import React from 'react';
import {Stack} from "expo-router";

const ShopLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="shop"
                options={{
                    title: 'Shop',
                    headerShown: false
                }}
                >
            </Stack.Screen>
        </Stack>
    );
};

export default ShopLayout;
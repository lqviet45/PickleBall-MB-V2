import React from 'react';
import {Stack} from "expo-router";
import * as Linking from "expo-linking";
import {NavigationContainer} from "@react-navigation/native";

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
            <Stack.Screen
                name="[id]"
                options={{
                    title: 'Chi tiết sản phẩm',
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: 'white'
                    }
                }}
            >
            </Stack.Screen>

        </Stack>
    );
};

export default ShopLayout;
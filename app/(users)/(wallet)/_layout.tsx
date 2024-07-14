import React from 'react';
import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";

const WalletLayout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="topup"
                    options={{
                        headerShown: true,
                        title: "Nạp",
                        headerStyle: {backgroundColor: '#ffde5b'},
                    }}
                />
                <Stack.Screen
                    name="withdraw"
                    options={{
                        headerShown: true,
                        title: "Rút",
                        headerStyle: {backgroundColor: '#ffde5b'},
                    }}
                />

                {/*<Stack.Screen name="edit-profile" options={{ headerShown: false }} />*/}
            </Stack>
            <StatusBar backgroundColor={'#08222F'} style="light" />
        </>
    );
};

export default WalletLayout;
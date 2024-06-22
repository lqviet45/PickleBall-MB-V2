import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import SettingButton from "@/components/SettingButton";
import {router} from "expo-router";
import auth from "@react-native-firebase/auth";
import {StatusBar} from "expo-status-bar";

const Settings = () => {
    const accountArea = [
        {
            title: 'Edit Profile',
            icon: 'person-outline' as keyof typeof Ionicons.glyphMap,
            size: 24,
            color: 'black',
            HandlePress: () => router.push('(users)/profile')
        },
        {
            title: 'Change Password',
            icon: 'key-outline' as keyof typeof Ionicons.glyphMap,
            size: 24,
            color: 'black',
            HandlePress: () => router.push('(auth)/change-password')
        },
        {
            title: 'Order',
            icon: 'bag-outline' as keyof typeof Ionicons.glyphMap,
            size: 24,
            color: 'black',
            HandlePress: () => router.push('(order)/order')
        },
        // {
        //     title: 'Notification',
        //     icon: 'notifications-outline' as keyof typeof Ionicons.glyphMap,
        //     size: 24,
        //     color: 'black',
        //     HandlePress: () => router.push('(notification)/notification')
        // },
        {
            title: 'Privacy',
            icon: 'lock-closed-outline' as keyof typeof Ionicons.glyphMap,
            size: 24,
            color: 'black',
            HandlePress: () => router.push('privacy')
        }
    ];

    const walletArea = [
        {
            title: 'Wallet',
            icon: 'wallet-outline' as keyof typeof Ionicons.glyphMap,
            size: 24,
            color: 'black',
            HandlePress: () => router.push('(users)/wallet/')
        },
        // {
        //     title: 'Help & Support',
        //     icon: 'help-circle-outline' as keyof typeof Ionicons.glyphMap,
        //     size: 24,
        //     color: 'black',
        //     HandlePress: () => router.push('help-support')
        // },
        {
            title: 'Terms & Policy',
            icon: 'information-circle-outline' as keyof typeof Ionicons.glyphMap,
            size: 24,
            color: 'black',
            HandlePress: () => router.push('terms-policy')
        }
    ];

    const actionsArea = [
        {
            title: 'Report Issue',
            icon: 'alert-circle-outline' as keyof typeof Ionicons.glyphMap,
            size: 24,
            color: 'black',
            HandlePress: () => router.push('report-issue')
        },
        {
            title: 'Rate App',
            icon: 'star-outline' as keyof typeof Ionicons.glyphMap,
            size: 24,
            color: 'black',
            HandlePress: () => router.push('rate-app')
        },
        {
            title: 'Share App',
            icon: 'share-social-outline' as keyof typeof Ionicons.glyphMap,
            size: 24,
            color: 'black',
            HandlePress: () => router.push('share-app')
        },
        {
            title: 'Logout',
            icon: 'log-out-outline' as keyof typeof Ionicons.glyphMap,
            size: 24,
            color: 'black',
            HandlePress: async () => {
                await auth().signOut();
                router.push('sign-in')
            }
        }
    ];
    return (
        <SafeAreaView className="h-full bg-white">
            <ScrollView>
                <View className="flex-row justify-between items-center px-4 py-4">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="chevron-back-outline" size={30} color="black" />
                    </TouchableOpacity>
                    <Text className="font-pmedium text-3xl">Settings</Text>
                    <View className="w-8 h-8"></View>
                </View>
                <View className="w-full min-h-[85vh] px-4 my-6 gap-y-10">
                    <View className="px-2">
                        <Text className="font-psemibold text-2xl">Account</Text>
                        <View className={"bg-gray-200/[0.07] h-fit rounded pb-2"}>
                            {
                                accountArea.map((item, index) => (
                                    SettingButton(item, index))
                                )
                            }
                        </View>
                    </View>

                    <View className="px-2">
                        <Text className="font-psemibold text-2xl">Wallet</Text>
                        <View className={"bg-gray-200/[0.07] h-fit rounded pb-2"}>
                            {
                                walletArea.map((item, index) => (
                                    SettingButton(item, index))
                                )
                            }
                        </View>
                    </View>

                    <View className="px-2">
                        <Text className="font-psemibold text-2xl">Wallet</Text>
                        <View className={"bg-gray-200/[0.07] h-fit rounded pb-2"}>
                            {
                                actionsArea.map((item, index) => (
                                    SettingButton(item, index))
                                )
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
        <StatusBar style="auto" />
        </SafeAreaView>
    );
};

export default Settings;
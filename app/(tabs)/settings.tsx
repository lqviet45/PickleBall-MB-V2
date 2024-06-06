import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

const Settings = () => {
    return (
        <SafeAreaView className="h-full bg-white">
            <ScrollView>
                <View className="w-full min-h-[85vh] px-4 my-6">
                    <View className="px-2">
                        <Text className="font-psemibold text-2xl">Account</Text>
                        <View className={"bg-gray-200/[0.07] h-fit rounded"}>
                            <TouchableOpacity className={"justify-center pt-2 border"}>
                                <View className="flex-row items-center px-2 gap-5">
                                    <Ionicons name="person-outline" size={24} color="black" />
                                    <Text className={"font-medium text-lg"}>Edit Profile</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity className={"justify-center pt-2"}>
                                <View className="flex-row items-center px-2 gap-5">
                                    <Ionicons name="bag-outline" size={24} color="black" />
                                    <Text className={"font-medium text-lg"}>Order</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Settings;
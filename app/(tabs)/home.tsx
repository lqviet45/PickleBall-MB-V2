import React from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from "react-native";
import {router} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {useGlobalContext} from "@/context/GlobalProvider";
import Ionicons from "@expo/vector-icons/Ionicons";
import CourtCardVertical from "@/components/CourtCardVertical";

const Home = () => {
    const {userFullName} = useGlobalContext();

    return (
        <SafeAreaView className={"bg-white h-full"}>
            <ScrollView>
                {/*Welcome view*/}
                <View className="flex-row justify-between pt-3 px-2">
                    <Text className="text-xl">Xin chào, {userFullName}</Text>
                    <Ionicons name="notifications-outline"
                              size={30} color="black" onPress={() => router.push('notification')}/>
                </View>
                {/*Played time and Wallet*/}
                <View className="flex-row justify-between px-2 pt-1">
                    <View className="p-2 rounded-2xl bg-[#001A27] w-[48%]">
                        <Ionicons name="time" size={28} color="white"/>
                        <View className={"flex-row justify-between"}>
                            <Text className={"text-white"}>Played time</Text>
                            <Text className={"text-white"}>420H</Text>
                        </View>
                    </View>
                    <View className="p-2 rounded-2xl bg-[#e6f8b3] w-[48%]">
                        <TouchableOpacity onPress={() => router.push('(users)/wallet/')}>
                            <Ionicons name="wallet-outline" size={28} color="black"/>
                            <View className="flex-row justify-between">
                                <Text>Wallet</Text>
                                <Text className={"text-gray-500"}>Nhấn để xem ví</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                {/*  Booked Court  */}
                <View>
                    <Text className="text-xl font-pbold px-2 pt-3">Sân từng đặt</Text>
                    <View className="flex-row flex-wrap">
                        <CourtCardVertical
                            courtId={'10d7c12e-95fe-485a-8756-39a559bb3a4a'}
                            courtImage={'https://via.placeholder.com/150'}
                            rating={4.5}
                            courtName={'Sân B'}
                            time={'08:00 - 16:00'}
                        />
                        <CourtCardVertical
                            courtId={'10d7c12e-95fe-485a-8756-39a559bb3a4a'}
                            courtImage={'https://via.placeholder.com/150'}
                            rating={4.5}
                            courtName={'Sân B'}
                            time={'08:00 - 16:00'}
                        />
                        <CourtCardVertical
                            courtId={'10d7c12e-95fe-485a-8756-39a559bb3a4a'}
                            courtImage={'https://via.placeholder.com/150'}
                            rating={4.5}
                            courtName={'Sân B'}
                            time={'08:00 - 16:00'}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
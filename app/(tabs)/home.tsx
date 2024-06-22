import React from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from "react-native";
import {router} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {useGlobalContext} from "@/context/GlobalProvider";
import Ionicons from "@expo/vector-icons/Ionicons";

const Home = () => {
    let name = 'John Doe';
    const {userLogin, isLoading, setIsLoading} = useGlobalContext();


    return (
        <SafeAreaView className={"bg-white h-full"}>
            <ScrollView>
                {/*Welcome view*/}
                <View className="flex-row justify-between pt-3 px-2">
                    <Text className="text-xl">Xin chào, {name}</Text>
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
                                <Text>200.000NVD</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                {/*  Booked Court  */}
                <View>
                    <Text className="text-xl font-pbold px-2 pt-3">Sân từng đặt</Text>
                    <View className="flex-row px-2">
                        <View className="bg-[#F5F5F5] m-3 w-[45%] rounded-2xl">
                            <TouchableOpacity
                                onPress = {() => {
                                    router.push({
                                        pathname: `(court)/[id]`,
                                        params: {id: '10d7c12e-95fe-485a-8756-39a559bb3a4a'}
                                    });
                                    }
                                }
                            >
                                <Image
                                    source={{uri: 'https://via.placeholder.com/150'}}
                                    className="w-full h-48 rounded-2xl"
                                    resizeMode={'cover'}>
                                </Image>
                                    <View className={"m-2 absolute bottom-1"}>
                                        <View className={"rounded-3xl bg-white px-1.5 flex-row self-start"}>
                                             <Text className={""}><Ionicons name="star" size={12} color="yellow"/> 4.5 </Text>
                                        </View>
                                        <Text>Sân A</Text>
                                        <Text>Thời gian: 15:00 - 16:00</Text>
                                    </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
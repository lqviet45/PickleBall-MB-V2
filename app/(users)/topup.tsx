import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {axiosInstance} from "@/lib/axios";
import {useGlobalContext} from "@/context/GlobalProvider";
import {useLocalSearchParams} from "expo-router";

const Topup = () => {
    const [input, setInput] = useState<string>("");
    const {userId} = useGlobalContext();
    const walletId = useLocalSearchParams<{walletId: string}>().walletId;
    const handleInput = (text: string) => {
        setInput(text);
    }
    const handleQuickInput = (amount: number) : void => {
        setInput(amount.toString());
    }
    const handleDeposit = async (amount: string) => {
        const isDeposited = await axiosInstance
            .post(`/deposits`, {
                body: {
                    userId: userId,
                    wallet: walletId,
                    amount: parseInt(amount)
                }
            })
    }
    return (
        <SafeAreaView className={"bg-white h-full"}>
            <View className={"m-3 py-4 flex-col"}>
                <Text className={"text-2xl font-pbold"}>Nhập số lượng</Text>
                <View className="border-2 border-black-200
                            w-full h-10 my-2 px-4 bg-white
                            focus:border-gray-500 items-center flex-row">
                    <TextInput
                        className="flex-1 text-black font-semibold
                                    text-base"
                        value={input}
                        editable={true}
                        placeholder={"Nhập số lượng tiền"}
                        placeholderTextColor={'#7b7b8b'}
                        onChangeText={e => handleInput(e)}
                    />
                </View>
                {/*  Quick input  */}
                <View className={"flex-row flex-wrap justify-between "}>
                    <TouchableOpacity
                        className={"border-amber-400 border-2 p-2 w-[30%] mb-2"}
                        onPress={() => handleQuickInput(100000)}>
                        <Text className={"text-amber-400"}>100.000</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className={"border-amber-400 border-2 p-2 w-[30%] mb-2"}
                        onPress={() => handleQuickInput(200000)}>
                        <Text className={"text-amber-400"}>200.000</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className={"border-amber-400 border-2 p-2 w-[30%] mb-2"}
                        onPress={() => handleQuickInput(300000)}>
                        <Text className={"text-amber-400"}>300.000</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className={"border-amber-400 border-2 p-2 w-[30%] mb-2"}
                        onPress={() => handleQuickInput(400000)}>
                        <Text className={"text-amber-400"}>400.000</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className={"border-amber-400 border-2 p-2 w-[30%] mb-2"}
                        onPress={() => handleQuickInput(500000)}>
                        <Text className={"text-amber-400"}>500.000</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        className={"bg-amber-400 w-full p-2 rounded-2xl mt-2"}
                        onPress={() => handleDeposit(input)}
                    >
                        <Text className={"text-white text-lg font-pbold text-center"}>Nạp tiền</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Topup;
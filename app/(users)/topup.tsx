import React, {useState} from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {axiosInstance} from "@/lib/axios";
import {useGlobalContext} from "@/context/GlobalProvider";
import {router, useLocalSearchParams} from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const Topup = () => {
    const [input, setInput] = useState<string>("");
    const {userId} = useGlobalContext();
    const walletId = useLocalSearchParams<{walletId: string}>().walletId;
    const handleInput = (text: string) => {
        setInput(text);
    }
    const addDotToAmount = (amount: number) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    const handleQuickInput = (amount: number) : void => {
        setInput(amount.toString());
    }
    const handleDeposit = async (amount: string) => {
        if (amount === "") {
            Alert.alert("Vui lòng nhập số tiền cần nạp");
            return;
        }
        if (parseInt(amount) < 50000) {
            Alert.alert("Số tiền nạp tối thiểu là 50.000đ");
            return;
        }
        if (parseInt(amount) > 2000000) {
            Alert.alert("Số tiền nạp tối đa là 2.000.000đ");
            return;
        }
        console.log("userId", userId);
        console.log("walletId", walletId);
        console.log("amount", amount);
        var money = parseInt(amount);
        console.log("money", money);
        await axiosInstance
            .post(`/deposits`, {
                    walletId: walletId,
                    userId: userId,
                    amount: amount
                }
            )
            .then(() => {
                Alert.alert("Nạp tiền thành công");
                router.replace("wallet");
            })
            .catch(e => {
                console.log("catching handleDeposit", e.response.data);
                Alert.alert("Nạp tiền thất bại");
            })
    }
    return (
        <SafeAreaView className={"h-full"}>
            <View className={"mx-2 flex-col"}>
                <Text className={"text-xl font-bold my-1"}>Nạp tiền vào</Text>
                <View className={"bg-white rounded-2xl p-2"}>
                    {/*Wallet selection*/}
                    <View className={"flex-col bg-amber-50 my-1 p-3 rounded-2xl border-2 border-amber-400"}>
                        <Text className={"text-lg font-semibold"}>Ví điện tử</Text>
                        <Text className={"text-lg font-semibold text-amber-400"}> 200.000 VND</Text>
                    </View>
                    {/*Money input*/}
                    <View className="border-2 border-gray-100 rounded-xl
                                w-full h-12 my-2 px-4 bg-white
                                focus:border-gray-500 items-center flex-row">
                        <TextInput
                            className="flex-1 text-black font-semibold
                                        text-base"
                            value={input}
                            keyboardType={"numeric"}
                            editable={true}
                            placeholder={"Nhập số lượng tiền"}
                            placeholderTextColor={'#7b7b8b'}
                            onChangeText={e => handleInput(e)}
                        />
                    </View>
                    {/*Quick input*/}
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
                </View>
                <Text className={"text-xl font-bold my-1"}>Từ nguồn tiền</Text>
                <View className={"bg-white rounded-2xl p-2"}>
                    {/*Bank selection*/}
                    <View className={"flex-row bg-amber-50 my-1 p-1 items-center rounded-2xl border-2 border-amber-400"}>
                        <Ionicons name={'logo-bitcoin'} size={40} color={'#ffde5b'}/>
                        <View className={"ml-1"}>
                            <Text className={"text-lg font-bold"}>TPBank</Text>
                            <Text className={"text-gray-500"}>Phí giao dịch 0đ</Text>
                        </View>
                    </View>
                    <View className={"flex-row my-1 p-1 items-center rounded-2xl"}>
                        <Ionicons name={'card'} size={40} color={'black'}/>
                        <View className={"ml-1"}>
                            <Text className={"text-lg font-bold"}>Thêm ngân hàng</Text>
                            <Text className={"text-gray-500"}>Liên kết với ngăn hàng sẵn có</Text>
                        </View>
                    </View>

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
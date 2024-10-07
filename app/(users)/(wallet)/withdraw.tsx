import React, {useEffect, useState} from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {axiosInstance, axiosInstanceAuth} from "@/lib/axios";
import {useGlobalContext} from "@/context/GlobalProvider";
import {router, useLocalSearchParams} from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {getUserToken} from "@/lib/authServices";
import {AddDotToNumber} from "@/lib/helper";
import QuickAmountInput from "@/components/QuickAmountInput";

const Withdraw = () => {
    const [input, setInput] = useState<string>("");
    const {userId} = useGlobalContext();
    const walletId = useLocalSearchParams<{walletId: string}>().walletId;
    const [wallet, setWallet] = useState<any>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const handleInput = (text: string) => {
        setInput(text);
    }
    const handleQuickInput = (amount: number) : void => {
        setInput(amount.toString());
    }
    const handleWithdraw = async (amount: string) => {
        if (amount === "") {
            Alert.alert("Vui lòng nhập số tiền cần nạp");
            return;
        }
        if (parseInt(amount) < 50000) {
            Alert.alert("Số tiền rút tối thiểu là 50.000đ");
            return;
        }
        if (parseInt(amount) > 2000000) {
            Alert.alert("Số tiền rút tối đa là 2.000.000đ");
            return;
        }
        console.log("userId", userId);
        console.log("walletId", walletId);
        console.log("amount", amount);
        var token = await getUserToken();
        var axiosInstance = axiosInstanceAuth(token);
        await axiosInstance
            .post(`/withdraws`, {
                    userId: userId,
                    walletId: walletId,
                    amount: parseInt(amount)
            })
            .then(() => {
                Alert.alert("Rút tiền thành công");
                router.replace("home");
            })
            .catch(e => {
                console.log("catching handleDeposit", e.response.data);
                Alert.alert("Rút tiền thất bại");
            })
    }
    useEffect(() => {
        setIsLoaded(false);
        const data = axiosInstance
            .get("/wallets/" + userId)
            .then((response) => {
                setWallet(response.data.value);
                setIsLoaded(true);
            })
            .catch((error) => {
                console.log("catching getWallet in useEffect", error);
            });
    }, []);
    if(!isLoaded){
        return(
            <SafeAreaView className={"h-full"}>
                <View className={"flex-1 justify-center items-center"}>
                    <Text className={"text-2xl font-bold"}>Loading ...</Text>
                </View>
            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView className={"h-full"}>
            <View className={"mx-2 flex-col"}>
                <Text className={"text-xl font-bold my-1"}>Rút tiền từ</Text>
                <View className={"bg-white rounded-2xl p-2"}>
                    {/*Index selection*/}
                    <View className={"flex-col bg-amber-50 my-1 p-3 rounded-2xl border-2 border-amber-400"}>
                        <Text className={"text-lg font-semibold"}>Ví của bạn</Text>
                        <Text className={"text-lg font-semibold text-amber-400"}>{AddDotToNumber(wallet.balance.toString())} VND</Text>
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
                        <QuickAmountInput amount={100000} onPressFunc={handleQuickInput}/>
                        <QuickAmountInput amount={200000} onPressFunc={handleQuickInput}/>
                        <QuickAmountInput amount={500000} onPressFunc={handleQuickInput}/>
                    </View>
                </View>
                <Text className={"text-xl font-bold my-1"}>Đến nguồn tiền</Text>
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
                        onPress={() => handleWithdraw(input)}
                    >
                        <Text className={"text-white text-lg font-pbold text-center"}>Rút tiền</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Withdraw;
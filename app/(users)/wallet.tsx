import React, {useEffect, useState} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {FlatList, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {useGlobalContext} from "@/context/GlobalProvider";
import {axiosInstance} from "@/lib/axios";
import {WalletData} from "@/model/wallet";
import {Transaction} from "@/model/transaction";
import {router} from "expo-router";
import {setParams} from "expo-router/build/global-state/routing";



const Wallet = () => {
    const {userFullName, userId} = useGlobalContext();
    const [wallet, setWallet] = useState<WalletData>();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [amount, setAmount] = useState<string>();
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const addDotToAmount = (amount: number) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const fetchWallet = async () => {
        const data = await axiosInstance
            .get(`wallets/${userId}`, {
                params: {
                    userId: userId
                }
            });
        setWallet(data.data.value);
    }

    const Topup = async () => {
        // implement topup function
        const data = await axiosInstance
            .post(`/deposits`, {
                body: {
                    userId: userId,
                    wallet: wallet?.id,
                    amount: 100000
                }
            })
    }

    const fetchTransaction = async () => {
        const data = await axiosInstance
            .get(`users/${userId}/transactions`, {
                params: {
                    userId: userId,
                    pageSize: 5
                }
            });
        setTransactions(data.data.value.items);
    }

    useEffect(() => {
        // fetch user wallet amount
        setIsRefreshing(true);
        fetchWallet()
            .then(() => {
            setAmount(addDotToAmount(wallet!.balance));
            console.log(amount);
            });
        setIsRefreshing(false);
        // fetch user transactions
        fetchTransaction();


    },[]);
    return (
        <SafeAreaView className={"bg-blue-950"}>
            {/*Wallet Container*/}
            <View className={"w-full bg-blue-800 h-60"}>
                {/*User information*/}
                <View className={"mx-3 mt-6 h-12 flex-row"}>
                    <Image source={{uri: 'https://via.placeholder.com/150'}}
                           className="w-10 h-10 rounded-3xl mx-5"
                           resizeMode={'cover'}
                    />
                    <Text className={"text-center text-white font-bold mt-1 text-xl"}>Xin chào, {userFullName}!</Text>
                </View>
                {/*Wallet Container*/}
                <View className={"mx-6 rounded-2xl bg-gradient-to-tr from-blue-100 to-blue-200 flex-col border-white border-2"}>
                    {/*Main balance*/}
                    <View className={"flex-col p-3 h-18"}>
                        <Text className={"text-center text-[#dfdfdf] font-light mb-1"}>Main balance</Text>
                        <Text className={"text-center text-white font-pextrabold text-2xl"}>
                            {isRefreshing ? "Loading..." : amount}
                            {isRefreshing ? "" : <Text className={"text-white font-pextrabold text-xl"}> VND</Text>}
                        </Text>
                    </View>
                    {/*Actions*/}
                    <View className={"flex-row justify-around h-16"}>
                        {/*Top-up*/}
                        <View className={"flex-col items-center justify-center w-[48%]"}>
                            <TouchableOpacity
                                onPress={() => {
                                    router.push({
                                        pathname: `(users)/topup/`,
                                        params: {
                                            walletId: wallet?.id
                                        }
                                    })
                                }}
                            >
                                <Ionicons name={"arrow-up-circle-outline"} size={20} color={"white"}/>
                                <Text className={"text-white text-center"}>Top-up</Text>
                            </TouchableOpacity>
                        </View>
                        {/*Withdraw*/}
                        <View className={"flex-col items-center justify-center w-[48%]"}>
                            <TouchableOpacity>
                                <Ionicons name={"arrow-down-circle-outline"} size={20} color={"white"}/>
                                <Text className={"text-white "}>Withdraw</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            {/*Something not implement yet!*/}
            <View className={"h-28 bg-white"}>
                <Text className={"text-black text-center mt-2"}>This feature is not implemented yet!</Text>
            </View>
            {/*Transaction History*/}
            <View className={"mt-2"}>
                {/*Header*/}
                <View className={"flex-row justify-between p-1"}>
                    <Text className={"text-xl font-pbold text-white "}>Latest Transaction</Text>
                    <TouchableOpacity>
                        <Text className={"font-light text-white align-text-bottom"}>View all</Text>
                    </TouchableOpacity>
                </View>
                {/*History Container*/}
                <View className={"p-2"}>
                    <FlatList
                        data={transactions}
                        keyExtractor={(item) => item.id}
                        initialNumToRender={10}
                        renderItem={(
                            (item) => (
                                <View className={"flex-row justify-between mb-2 border-b-2 border-white pb-1"}>
                                    <View className={"flex-row"}>
                                        <Image source={{uri: 'https://via.placeholder.com/50'}}
                                               className="w-10 h-10 rounded-3xl mx-3"
                                               resizeMode={'cover'}
                                        />
                                        <View>
                                            <Text className={"text-white font-bold"}>PPP Pickleball</Text>
                                            <Text className={"text-white"}>Today 12:20</Text>
                                        </View>
                                    </View>
                                    <View className={"flex-row items-center"}>
                                        <Text className={"text-green-400 mx-2.5"}>+ 200.000 VND</Text>
                                        <TouchableOpacity>
                                            <Text className={"text-light text-white"}>Detail</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        )}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Wallet;
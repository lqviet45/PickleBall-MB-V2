import React, {useEffect, useState} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {ActivityIndicator, FlatList, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {useGlobalContext} from "@/context/GlobalProvider";
import {axiosInstance} from "@/lib/axios";
import {Transaction} from "@/model/transaction";
import {router} from "expo-router";
import {AddDotToNumber} from "@/lib/helper";



const Index = () => {
    const {userFullName, userId} = useGlobalContext();
    const [walletId, setWalletId] = useState<string>("");
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [amount, setAmount] = useState<string>("");
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const formatDateTime = (date: string) => {
        const newDate = new Date(date);
        return newDate.toLocaleString();
    }
    const handleViewAllTransaction = () => {
        router.replace({
            pathname: `(users)/(wallet)/transactions/`,
            params: {
                walletId: walletId
            }
        });
    }

    const fetchWallet = async () => {
        const data = await axiosInstance
            .get(`wallets/${userId}`, {
                params: {
                    userId: userId
                }
            });
        setWalletId(data.data.value.id);
        setAmount(data.data.value.balance);
    }

    const fetchTransaction = async () => {
        const data = await axiosInstance
            .get(`users/${userId}/transactions`, {
                params: {
                    userId: userId,
                    pageSize: 6
                }
            });
        setTransactions(data.data.value.items);
    }

    useEffect(() => {
        setIsRefreshing(true);
        // fetch user (wallet) amount
        fetchWallet()
            .then(() => setIsRefreshing(false))
            .catch(e => console.log("catching fetchWallet", e));
        // fetch user transaction
        fetchTransaction()
            .then(() => setIsRefreshing(false))
            .catch(e => console.log("catching fetchTransaction", e))
    },[]);
    if (isRefreshing) {
        return(
            <SafeAreaView className={"h-full flex-row items-center justify-center"}>
                <ActivityIndicator size="large" color="black"/>
                <Text className="text-center text-black font-pmedium text-lg">
                    Loading...
                </Text>
            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView className={"bg-blue-950"}>
            {/*Index Container*/}
            <View className={"w-full bg-blue-800 h-80"}>
                {/*User information*/}
                <TouchableOpacity
                    className={"mt-1 p-1"}
                    onPress={() => router.back()}
                >
                    <Ionicons
                        name={'chevron-back'}
                        size={34}
                        color={'white'}
                    />
                </TouchableOpacity>
                <View className={"mx-3 mb-3 h-16 flex-row items-center"}>
                    <Image source={{uri: 'https://via.placeholder.com/150'}}
                           className="w-10 h-10 rounded-3xl mx-5"
                           resizeMode={'cover'}
                    />
                    <View className={"flex-col"}>
                        <Text className={" text-white font-plight mt-1 text-xl"}>
                            Xin chào,{' '}
                        </Text>
                        <Text className={"text-white font-bold text-2xl"}>
                            {userFullName}
                        </Text>
                    </View>
                </View>
                {/*Index Container*/}
                <View className={"mx-6 rounded-2xl bg-gradient-to-tr from-blue-100 to-blue-200 flex-col border-white border-2"}>
                    {/*Main balance*/}
                    <View className={"flex-col p-3 h-18"}>
                        <Text className={"text-center text-[#dfdfdf] font-light mb-1"}>Main balance</Text>
                        <Text className={"text-center text-white font-pextrabold text-2xl"}>
                            {isRefreshing ? "Loading..." : AddDotToNumber(parseInt(amount))}
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
                                        pathname: `(users)/(wallet)/topup/`,
                                        params: {
                                            walletId: walletId
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
                            <TouchableOpacity
                                onPress={() => {
                                    router.push({
                                        pathname: `(users)/(wallet)/withdraw/`,
                                        params: {
                                            walletId: walletId
                                        }
                                    })
                                }}
                            >
                                <Ionicons name={"arrow-down-circle-outline"} size={20} color={"white"}/>
                                <Text className={"text-white "}>Withdraw</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

            {/*Transaction History*/}
            <View className={"mt-2"}>
                {/*Header*/}
                <View className={"flex-row justify-between p-1 mb-2"}>
                    <Text className={"text-xl font-pbold text-white "}>Latest Transaction</Text>
                </View>
                {/*History Container*/}
                <View className={"p-2"}>
                    <FlatList
                        className={""}
                        data={transactions}
                        keyExtractor={(item) => item.id}
                        initialNumToRender={10}
                        renderItem={
                            ({item}) => (
                                <View className={"flex-row justify-between mb-2 border-b-2 border-white pb-1"}>
                                    <View className={"flex-row"}>
                                        {item.description == "Deposit" ?
                                            (<Ionicons
                                                    name={"arrow-up-circle-outline"} color={"green"} size={36}
                                                />
                                            ) :
                                            (<Ionicons
                                                name={"arrow-down-circle-outline"} color={"red"} size={36}
                                            />)
                                        }
                                        <View className={"ml-2"}>
                                            <Text className={"text-white font-bold"}>{
                                                item.courtGroupName ? item.courtGroupName : "Deposit/Withdraw"
                                            }</Text>
                                            <Text className={"text-white"}>{formatDateTime(item.createdOnUtc)}</Text>
                                        </View>
                                    </View>
                                    <View className={"flex-row items-center"}>
                                        <Text className={"text-green-400 mx-2.5"}>
                                            {item.description == "Deposit" ? "+" : "-"} {AddDotToNumber(item.amount)} VND
                                        </Text>
                                    </View>
                                </View>
                            )
                        }
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Index;
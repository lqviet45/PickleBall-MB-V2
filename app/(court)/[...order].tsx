import {View, Text, ScrollView, TouchableOpacity, TextInput, Alert, FlatList} from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, {useEffect, useRef, useState} from "react";
import {Formik} from "formik";
import {DateTimePickerAndroid} from "@react-native-community/datetimepicker";
import {date, number, object, string} from "yup";
import * as Notifications from "expo-notifications";
import {axiosInstance, axiosInstanceAuth} from "@/lib/axios";
import {useGlobalContext} from "@/context/GlobalProvider";
import {getUserToken} from "@/lib/authServices";
import {AddDotToNumber} from "@/lib/helper";
import CustomDropdown from "@/components/CustomDropdown";
import {useFocusEffect} from "@react-navigation/core";


let orderSchema = object({
    id: string().required(),
    name: string().required(),
    price: number().required(),
    number: number().required(),
    date: date().required(),
    slotBookingTime: string().required()
});

const OrderPage = () => {

    const [courtYard, setCourtYard] = useState([{label: 'Chọn sân', value: ''}]);
    const [forceUpdate, setForceUpdate] = useState(false);

    const [selectedYardSlot, setSelectedYardSlot] = useState<{
        slotName: string;
        status: string;
        selected: boolean;
    }[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [numOfPeople, setNumOfPeople] = useState(0);
    const courtYardRef = useRef<string>('');
    const selectedYardSlotRef = useRef<string[]>([]);

    const {id, name, price} = useLocalSearchParams<{
        id: string;
        name: string;
        price: string;
    }>();

    const {userLogin} = useGlobalContext();

    const showDatepickerAndroid = (onChangeDate: any, value: Date) => {
        DateTimePickerAndroid.open({
            value: value,
            onChange: onChangeDate,
            mode: 'date',
            display: 'spinner',
            is24Hour: true,
            minimumDate: new Date()
        });
    }
    const showDatePicker = (onChangeDate: any, value: Date) => {
        showDatepickerAndroid(onChangeDate, value);
    }

    const submitOrder = async () => {
        console.log('submit order');
        try {
            if (numOfPeople === 0) {
                Alert.alert('Error', 'Please enter the number of people');
                return;
            }
            if (selectedDate === undefined) {
                Alert.alert('Error', 'Please enter the date');
                return;
            }
            if (courtYardRef.current === '') {
                Alert.alert('Error', 'Please choose the court yard');
                return;
            }
            if (selectedYardSlotRef.current.length === 0) {
                Alert.alert('Error', 'Please choose the slot');
                return;
            }
            let totalSlot = selectedYardSlotRef.current.map((item) => item).join(', ');
            const data = {
                courtGroupId: id,
                email: userLogin?.email,
                numberOfPlayers: numOfPeople,
                bookingDate: selectedDate.toLocaleDateString('fr-CA', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }),
                timeRange: totalSlot,
            }
            console.log(data);
            const token = await getUserToken();

            const axiosAuth = axiosInstanceAuth(token);

            const res = await axiosAuth
                .post('/bookings', data);

            //await schedulePushNotification();

            router.replace({
                pathname: '/(order)/order/',
                params: {
                    id: res.data.value.id
                }
            });

        } catch (e) {
            console.log("Order error",e);
            Alert.alert('Error', 'An error occurred while booking');
        }
    }

    const handleChooseCourtYard = async (item: any) => {
        try {
            if (courtYardRef.current !== item.value) {
                courtYardRef.current = item.value;

                const slot = await axiosInstance
                    .get(`/courtyards/${item.value}/slots`);
                let slots: {
                    slotName: string;
                    status: string;
                    selected: boolean;
                }[] = [];
                slot.data.value.map(
                    (item: any) => {
                        item.status === 'Available' ?
                        slots.push({
                            slotName: item.slotName,
                            status: item.status,
                            selected: false
                        }) : null
                    });
                //selectedYardSlot.current = slots;
                setSelectedYardSlot(slots);
                setForceUpdate(!forceUpdate);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const handlePickSlot = (slot: any, index: any) => {
        const updatedSlots = selectedYardSlot.map((item, i) =>
            i === index ? { ...item, selected: !item.selected } : item
        );
        updatedSlots[index].selected ? selectedYardSlotRef.current.push(slot.slotName) : selectedYardSlotRef.current = selectedYardSlotRef.current.filter((item) => item !== slot.slotName);
        setSelectedYardSlot(updatedSlots);
    }

    const fetchCourtYard = async () => {
        const data = await axiosInstance
            .get(`/court-groups/${id}/court-yards`,
                {
                    params: {
                        CourtGroupId: id
                    }
                });
        data.data.value.items.map((item: any) => {
            if (!courtYard.find((yard: any) => yard.value === item.id)?.value) {
                setCourtYard(prevState => [
                    ...prevState,
                    {
                        label: item.name,
                        value: item.id
                    }
                ]);
            }
        });

    }

    useEffect(() => {
        fetchCourtYard();
    }, []);

    return (
        <SafeAreaView className="h-full">
            <ScrollView className="h-full">
                <View className={'w-full justify-center pt-2 px-2'}>
                    {/*Back button*/}
                    <View className="flex-row justify-between items-center py-4">
                        <View className="flex-row gap-5 my-2">
                            <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="chevron-back-outline" size={30} color="black"/>
                            </TouchableOpacity>
                            <Text className="font-bold text-2xl">Đặt sân</Text>
                        </View>
                    </View>
                    {/*Court name*/}
                    <View className="flex-row justify-start items-center w-full mb-4">
                        <Ionicons
                            name={'location'}
                            size={30}
                            color={'black'}
                        />
                        <Text className="text-2xl pl-3 font-bold text-black">
                            {name}
                        </Text>
                    </View>
                    <View className="justify-start w-full mb-4">
                        <TouchableOpacity
                            className='flex-row items-center'
                            onPress={() => showDatePicker(async (event: any, selectedDate: any) => {
                                const currentDate = selectedDate;
                                setSelectedDate(currentDate);
                            }, selectedDate)}
                        >
                            <Ionicons
                                name="calendar-outline"
                                size={34}
                                color="black"/>
                            <View className={"flex-row"}>
                                <Text className="pl-3 font-plight text-lg items-center justify-center">
                                    Vào ngày
                                </Text>
                                <TextInput
                                    className="text-lg pl-3 font-plight text-black"
                                    editable={false}
                                    value={selectedDate.toLocaleDateString('vi-VN', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/*Amount of people*/}
                    <View className="flex-row justify-start items-center w-full mb-4">
                        <Ionicons
                            name={'people'}
                            size={34}
                            color={'black'}
                        />
                        <Text className="text-lg pl-3 font-plight text-black">
                            Số lượng người chơi:
                        </Text>
                        <TextInput
                            className="text-lg ml-4 font-plight text-black"
                            placeholder="number players"
                            keyboardType="numeric"
                            onChangeText={(text) => text !== "" ? setNumOfPeople(parseInt(text)) : setNumOfPeople(0)}
                            value={numOfPeople.toString()}
                        />
                    </View>

                    {/*Handle render multiple slot to choose*/}
                    <View className="flex-row justify-start items-center w-full mb-4">
                        <Ionicons
                            name={'film-outline'}
                            size={34}
                            color={'black'}
                        />
                        <CustomDropdown data={courtYard}
                                        label={'Chọn sân'}
                                        valueField={'value'}
                                        labelField={'label'}
                                        onChange={handleChooseCourtYard}
                                        value={courtYardRef.current === undefined ? 'Chọn sân' : courtYardRef.current}
                        />
                    </View>
                    <View className={""}>
                        <FlatList
                            numColumns={3}
                            data={selectedYardSlot}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item, index}) => {
                                return (
                                    item.selected ? (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => handlePickSlot(item, index)}
                                            className={"flex-col justify-between items-center border-gray-400 bg-green-500 w-[30%] mx-auto mb-2"}
                                        >
                                            <View
                                                className={"justify-between items-center"}>
                                                <Text className={"text-black font-plight text-lg"}>
                                                    {item.slotName}
                                                </Text>
                                                <Text className={"text-gray-50 font-plight text-lg"}>
                                                    {item.status}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => handlePickSlot(item, index)}
                                            className={"flex-col justify-between items-center border-gray-400 border-2 bg-gray-100 w-[30%] mx-auto mb-2"}
                                        >
                                            <View
                                                className={"justify-between items-center"}>
                                                <Text className={"text-black font-plight text-lg"}>
                                                    {item.slotName}
                                                </Text>
                                                <Text className={"text-green-400 font-plight text-lg"}>
                                                    {item.status}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                )
                            }}
                        />
                    </View>
                    {/*Price and booking*/}
                    <View className="flex-row justify-between mx-6 items-center mb-4">
                        {/*Price of booking*/}
                        <View className={"flex-col"}>
                            <Text className="text-black font-bold text-lg">
                                Giá
                            </Text>
                            <Text className="text-black font-plight  text-2xl">
                                {price !== undefined ? AddDotToNumber(parseInt(price)) : price} Đ
                            </Text>
                        </View>
                        {/*Booking button*/}
                        <TouchableOpacity
                            onPress={submitOrder}
                            className="w-44 bg-secondary rounded-xl px-6 items-center justify-center py-3"
                        >
                            <Text className="text-black font-bold text-2xl">
                                Đặt sân
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "You've booked success 📬",
            body: 'Your booking is successful, please wait for confirmation from the owner!',
            data: {data: 'goes here', url: '/(order)/order'},
        },
        trigger: {seconds: 2},
    });
}

export default OrderPage;
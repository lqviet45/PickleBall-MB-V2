import {View, Text, ScrollView, TouchableOpacity, Pressable, TextInput, Alert} from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, {useEffect, useRef, useState} from "react";
import {Formik} from "formik";
import {DateTimePickerAndroid} from "@react-native-community/datetimepicker";
import {date, number, object, string} from "yup";
import * as Notifications from "expo-notifications";
import {axiosInstance} from "@/lib/axios";
import {useGlobalContext} from "@/context/GlobalProvider";

let orderSchema = object({
    id: string().required(),
    name: string().required(),
    price: number().required(),
    number: number().required(),
    date: date().required(),
    startTime: string().required(),
    endTime: string().required()
});

const OrderPage = () => {

    const {id, name, price} = useLocalSearchParams<{
        id: string;
        name: string;
        price: string;
    }>();

    const {userLogin} = useGlobalContext();

    const [order, setOrder] = useState({
        id: id,
        name: name,
        email: userLogin?.email,
        price: parseInt(price ?? '0'),
        number: 2,
        date: new Date(),
        //time: '01:00',
        startTime: '07:00',
        endTime: '08:00'
    });

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

    const showTimePicker = (onChangeDate: any, value: Date) => {
        DateTimePickerAndroid.open({
            value: value,
            onChange: onChangeDate,
            mode: 'time',
            display: 'spinner',
            is24Hour: true
        });
    }

    const submitOrder = async (values: any) => {
        console.log('submit order');
        try {
            const data = {
                courtGroupId: values.id,
                email: userLogin?.email,
                numberOfPlayers: values.number,
                bookingDate: values.date.toLocaleDateString('fr-CA', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }),
                timeRange: values.startTime + ' - ' + values.endTime,
            }

            const res = await axiosInstance
                .post('/bookings', data);

            //await schedulePushNotification();

            router.push({
                pathname: '/(order)/order/',
                params: {
                    id: res.data.value.id
                }
            });

        } catch (e) {
            console.log(e);
            Alert.alert('Error', 'An error occurred while booking');
        }
    }

    return (
        <SafeAreaView className="h-full">
            <ScrollView className="h-full">
                <View className={'w-full justify-center pt-2'}>
                    <View className="px-2">
                        <View className="flex-row justify-between items-center py-4">
                            <View className="flex-row gap-5">
                                <TouchableOpacity onPress={() => router.back()}>
                                    <Ionicons name="chevron-back-outline" size={30} color="black"/>
                                </TouchableOpacity>
                                <Text className="font-pmedium text-3xl">Order</Text>
                            </View>
                            <View className="w-8 h-8"></View>
                        </View>

                        <View className="flex-row justify-start items-center w-full mb-4">
                            <Ionicons
                                name={'location'}
                                size={30}
                                color={'black'}
                            />
                            <Text className="text-lg pl-3 font-bold text-black">
                                {name}
                            </Text>
                        </View>

                        <View className="flex-row justify-start items-center w-full mb-4">
                            <Ionicons
                                name={'cash'}
                                size={30}
                                color={'black'}
                            />
                            <Text className="text-lg pl-3 font-bold text-black">
                                {price} VND/h
                            </Text>
                        </View>

                        <Formik
                            initialValues={order}
                            onSubmit={submitOrder}
                            //validationSchema={orderSchema}
                            //validateOnBlur={true}
                        >
                            {({handleChange, handleSubmit, values
                            , setFieldValue, errors, touched}) => (
                                <>
                                    <View className="justify-start w-full mb-4">
                                        <TouchableOpacity
                                            className='flex-row'
                                            onPress={() => showDatePicker(async (event: any, selectedDate: any) => {
                                                const currentDate = selectedDate || order.date;
                                                await setFieldValue('date', currentDate)
                                                    .catch((error: any) => {});
                                            }, values.date)}
                                        >
                                            <Ionicons name="calendar-outline" size={30} color="black"/>
                                            <TextInput
                                                className="text-lg pl-3 font-bold text-black"
                                                editable={false}
                                                value={values.date.toLocaleDateString('vi-VN', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric'
                                                })}
                                            />
                                        </TouchableOpacity>
                                    </View>

                                    <View className="flex-row justify-start items-center w-full mb-4">
                                        <Ionicons
                                            name={'people'}
                                            size={30}
                                            color={'black'}
                                        />
                                        <TextInput
                                            className="text-lg pl-3 font-bold text-black"
                                            placeholder="number players"
                                            keyboardType="numeric"
                                            onChangeText={handleChange('number')}
                                            value={values.number.toString()}
                                        />
                                    </View>

                                    {/*<View className="justify-start w-full mb-4">*/}
                                    {/*    <TouchableOpacity*/}
                                    {/*        className='flex-row'*/}
                                    {/*        onPress={() => showTimePicker(async (event: any, selectedDate: any) => {*/}
                                    {/*            const currentTime = selectedDate || order.time;*/}
                                    {/*            const timeString = currentTime.toLocaleTimeString('vi-VN', {*/}
                                    {/*                hour: '2-digit',*/}
                                    {/*                minute: '2-digit',*/}
                                    {/*            });*/}
                                    {/*            await setFieldValue('time', timeString)*/}
                                    {/*                .catch((error: any) => {});*/}
                                    {/*        }, new Date(`2022-01-01T${values.time}`))}*/}
                                    {/*    >*/}
                                    {/*        <Ionicons*/}
                                    {/*            name="time-outline"*/}
                                    {/*            size={30}*/}
                                    {/*            color="black"*/}
                                    {/*        />*/}
                                    {/*        <TextInput*/}
                                    {/*            className="text-lg pl-3 font-bold text-black"*/}
                                    {/*            editable={false}*/}
                                    {/*            value={values.time}*/}
                                    {/*        />*/}
                                    {/*    </TouchableOpacity>*/}
                                    {/*</View>*/}

                                    <View className="justify-start w-full mb-4">
                                        <TouchableOpacity
                                            className='flex-row'
                                            onPress={() => showTimePicker(async (event: any, selectedDate: any) => {
                                                const currentTime = selectedDate || order.startTime;
                                                const timeString = currentTime.toLocaleTimeString('vi-VN', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                });
                                                await setFieldValue('startTime', timeString)
                                                    .catch((error: any) => {});
                                            }, new Date(`2022-01-01T${values.startTime}`))}
                                        >
                                            <Ionicons
                                                name={'time-outline'}
                                                size={30}
                                                color={'black'}
                                            />
                                            <Text className="pl-6 font-bold text-lg items-center justify-center">
                                                Start Time
                                            </Text>
                                            <TextInput
                                                className="text-lg pl-3 font-bold text-black"
                                                editable={false}
                                                value={values.startTime}
                                            />
                                        </TouchableOpacity>
                                    </View>


                                    <View className="justify-start w-full mb-4">
                                        <TouchableOpacity
                                            className='flex-row'
                                            onPress={() => showTimePicker(async (event: any, selectedDate: any) => {
                                                const currentTime = selectedDate || order.endTime;

                                                const startTime = new Date(`2022-01-01T${values.startTime}`);

                                                const playTime= Math.ceil((currentTime.getTime() - startTime.getTime()) / 3600000);

                                                if (playTime < 1) {
                                                    currentTime.setHours(startTime.getHours() + 1);
                                                    Alert.alert('Invalid Time', 'The minimum time is 1 hour');
                                                    return;
                                                }

                                                await setFieldValue('price', (playTime * order.price));

                                                const timeString = currentTime.toLocaleTimeString('vi-VN', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                });
                                                await setFieldValue('endTime', timeString);
                                            }, new Date(`2022-01-01T${values.endTime}`))}
                                        >
                                            <Ionicons
                                                name={'time-outline'}
                                                size={30}
                                                color={'black'}
                                            />
                                            <Text className="pl-6 font-bold text-lg items-center justify-center">
                                                End Time
                                            </Text>
                                            <TextInput
                                                className="text-lg pl-3 font-bold text-black"
                                                editable={false}
                                                value={values.endTime}
                                            />
                                        </TouchableOpacity>
                                    </View>


                                    <View className="flex-row justify-between items-center mb-4 mt-10">
                                        <Text className="text-lg font-bold text-black">
                                            {values.price.toString()} VND
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => handleSubmit()}
                                            className="bg-amber-400 rounded-xl px-6 items-center justify-center py-3"
                                        >
                                            <Text className="text-black font-bold text-lg">
                                                Order
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )}
                        </Formik>
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
            data: { data: 'goes here', url: '/(order)/order'},
        },
        trigger: {seconds: 2},
    });
}

export default OrderPage;
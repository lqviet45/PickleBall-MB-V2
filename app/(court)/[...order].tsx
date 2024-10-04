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
import {Dropdown} from "react-native-element-dropdown";
import CustomDropdown from "@/components/CustomDropdown";

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

    const [courtYard, setCourtYard] = useState([{
        label: '',
        value: ''
    }]);
    const [slots, setSlots] = useState([{
        yardId: '',
        slots: []
    }]);
    const [selectedYardSlot, setSelectedYardSlot] = useState([]);
    const courtYardRef = useRef<string>('');

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
                //timeRange: values.startTime + ' - ' + values.endTime,
                timeRange: '07:00 - 08:00',
            }
            const token = await getUserToken();
            const axiosAuth = axiosInstanceAuth(token);

            const res = await axiosAuth
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

    const handleChooseCourtYard = (item: any) => {
        try {
            if (courtYardRef.current !== item.value){
                courtYardRef.current = item.value;
                setSelectedYardSlot(
                    slots.filter((slot: any) => slot.yardId === item.value)[0].slots
                );
                console.log("Selected Yard Slot: ", selectedYardSlot);
                //Handle choose court yard
            }
        } catch (e) {
            console.log(e);
        }
    }

    const fetchCourtYard = async () => {
        const data = await axiosInstance
            .get(`/court-groups/${id}/court-yards`,
                {
                    params:{
                        CourtGroupId: id
                    }
                });
        data.data.value.items.map((item: any) => {
            setCourtYard(prevState => [
                ...prevState,
                {
                    label: item.name,
                    value: item.id
                }
            ]);
            setSlots(prevState => [
                ...prevState,
                {
                    yardId: item.id,
                    slots: item.slots
                }
            ]);
        });
    }

    useEffect(() => {
        fetchCourtYard();
        console.log("Selected Yard Slot: ", selectedYardSlot);

    }, []);

    return (
        <SafeAreaView className="h-full">
            <ScrollView className="h-full">
                <View className={'w-full justify-center pt-2'}>
                    <View className="px-2">
                        {/*Back button*/}
                        <View className="flex-row justify-between items-center py-4">
                            <View className="flex-row gap-5 my-2">
                                <TouchableOpacity onPress={() => router.back()}>
                                    <Ionicons name="chevron-back-outline" size={30} color="black"/>
                                </TouchableOpacity>
                                <Text className="font-bold text-2xl">Đặt sân</Text>
                            </View>
                        </View>

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
                                            className='flex-row items-center'
                                            onPress={() => showDatePicker(async (event: any, selectedDate: any) => {
                                                const currentDate = selectedDate || order.date;
                                                await setFieldValue('date', currentDate)
                                                    .catch((error: any) => {});
                                            }, values.date)}
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
                                                    value={values.date.toLocaleDateString('vi-VN', {
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
                                            onChangeText={handleChange('number')}
                                            value={values.number.toString()}
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
                                                        value={courtYardRef.current === null ? 'Chọn sân' : courtYardRef.current}
                                        />
                                    </View>

                                        {/*Handle render multiple slot to choose*/}

                                        <FlatList

                                            numColumns={2}
                                            data={selectedYardSlot} renderItem={
                                            ({item}) => (
                                                <View className="flex-col justify-center items-center w-[46%] mx-auto border-2 border-gray-500 rounded-full mb-4">
                                                    <Text className="text-lg pl-3 font-plight text-black">
                                                        {item.slotName}
                                                    </Text>
                                                    <Text className="text-lg pl-3 font-plight text-black">
                                                        {item.status}
                                                    </Text>
                                                </View>
                                            )
                                        }
                                        />

                                    {/*Price and booking*/}
                                    <View className="flex-row justify-between mx-6 items-center mb-4">
                                        <View className={"flex-col"}>
                                            <Text className="text-black font-bold text-lg">
                                                Giá
                                            </Text>
                                            <Text className="text-black font-plight  text-2xl">
                                                {AddDotToNumber(values.price)} Đ
                                            </Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => handleSubmit()}
                                            className="w-44 bg-secondary rounded-xl px-6 items-center justify-center py-3"
                                        >
                                            <Text className="text-black font-bold text-2xl">
                                                Đặt sân
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
import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import {DateTimePickerAndroid} from "@react-native-community/datetimepicker";
import CustomDateTimePicker from "@/components/CustomDateTimePicker";


const Profile = () => {

    const [userInform, setUserInform] = useState({
        name: '',
        email: '',
        dateOfBirth: new Date(),
        city: '',
        huyen: '',
        xa: ''
    });

    useEffect(() => {
        //getUserInform();

    }, []);

    const onChangeDate = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || userInform.dateOfBirth;
        setUserInform({...userInform, dateOfBirth: currentDate});
    };

    const showDatepicker = (currentMode: any) => {
        //setShow(true);
        DateTimePickerAndroid.open({
           value: userInform.dateOfBirth,
           onChange: onChangeDate,
           mode: currentMode,
            display: 'spinner',
            is24Hour: true,
        });
    }

    const showDatePicker = () => {
        showDatepicker('date');
    }

    const userInformation = [
        {
            title: 'Name',
            value: userInform.name,
            handleChangeText: (e: string) => setUserInform({...userInform, name: e}),
            otherStyles: 'mt-10',
            KeyboardType: 'default'
        },
        {
            title: 'Email',
            value: userInform.email,
            handleChangeText: (e: string) => setUserInform({...userInform, email: e}),
            otherStyles: 'mt-10',
            KeyboardType: 'email-address'
        }
    ];

    return (
        <SafeAreaView className="bg-Base h-full">
            <ScrollView>
                <View className="w-full min-h-[85vh] px-4 my-6">
                    <View className="items-center">
                        <Text className="text-2xl text-yellow-100 text-semibold mt-10 font-psemibold">
                            Profile
                        </Text>
                    </View>

                    {userInformation.map((item, index) => (
                        <FormField
                            key={index}
                            title={item.title}
                            value={item.value}
                            handleChangeText={item.handleChangeText}
                            otherStyles={item.otherStyles}
                            keyBoardType={item.KeyboardType}
                        />
                    ))}

                    <CustomDateTimePicker
                        userInform={userInform}
                        onChangeDate={onChangeDate}
                        title={"Date of Birth"}
                        otherStyles={"mt-10"}
                        editable={false}
                        placeholder={"dd/mm/yyyy"}
                        currentMode={'date'}
                    />

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;
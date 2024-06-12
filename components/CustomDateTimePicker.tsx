import React from 'react';
import {Pressable, Text, TextInput, View} from "react-native";
import {DateTimePickerAndroid} from "@react-native-community/datetimepicker";


interface CustomDateTimePickerProps {
    userInform: any;
    onChangeDate: (event: any, selectedDate: any) => void;
    title: string;
    otherStyles?: string;
    editable?: boolean;
    placeholder?: string;
    currentMode?: any;
    display?: any;
}

const CustomDateTimePicker = (
    {
        userInform,
        onChangeDate,
        title, otherStyles,
        editable,
        placeholder,
        currentMode,
        display
    } : CustomDateTimePickerProps) => {
    const showDatepicker = () => {
        //setShow(true);
        DateTimePickerAndroid.open({
            value: userInform.dateOfBirth,
            onChange: onChangeDate,
            mode: currentMode ?? 'date',
            display: display ?? 'default',
            is24Hour: true,
        });
    }

    const showDatePicker = () => {
        showDatepicker();
    }

    return (
        <Pressable
            onPress={showDatePicker}
        >
            <View className={`space-y-2` + otherStyles}>
                <Text className="text-base text-gray-100 font-pmedium">
                    {title}
                </Text>
                <View className="border-2 border-black-200
            w-full h-16 px-4 bg-black-100
            rounded-2xl focus:border-secondary items-center flex-row">
                    <TextInput
                        className="flex-1 text-white font-semibold
                    text-base"
                        value={userInform.dateOfBirth.toLocaleDateString('vi-VN', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        })}
                        placeholder={placeholder}
                        placeholderTextColor={'#7b7b8b'}
                        editable={editable}
                    />
                </View>
            </View>
        </Pressable>
    );
};

export default CustomDateTimePicker;
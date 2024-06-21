import React from 'react';
import {Pressable, Text, TextInput, View} from "react-native";
import {DateTimePickerAndroid} from "@react-native-community/datetimepicker";


interface CustomDateTimePickerProps {
    date: any;
    //onChangeDate: (event: any, selectedDate: any) => void;
    title: string;
    otherStyles?: string;
    editable?: boolean;
    placeholder?: string;
    currentMode?: any;
    display?: any;
    isEdit?: boolean;
    setFieldValue: any;
    fieldValueName: string;
    inputStyles?: string;
    textStyles?: string;
}

const CustomDateTimePicker = (
    {
        date,
        title,
        otherStyles,
        editable,
        placeholder,
        currentMode,
        display,
        isEdit,
        setFieldValue,
        fieldValueName,
        inputStyles,
        textStyles
    } : CustomDateTimePickerProps) => {
    const showDatepickerAndroid = () => {
        //setShow(true);
        DateTimePickerAndroid.open({
            value: date,
            onChange: onChangeDate,
            mode: currentMode ?? 'date',
            display: display ?? 'default',
            is24Hour: true,
        });
    }

    const showDatePicker = () => {
        if (isEdit)
            showDatepickerAndroid();
    }

    const onChangeDate = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setFieldValue(fieldValueName, currentDate);
    };

    return (
        <Pressable
            onPress={showDatePicker}
        >
            <View className={`space-y-2 ${otherStyles}`}>
                <Text className="text-base text-gray-100 font-pmedium">
                    {title}
                </Text>
                <View className={`w-full h-16 px-4
            rounded-2xl focus:border-secondary items-center flex-row ${inputStyles}`}>
                    <TextInput
                        className={`flex-1 ${textStyles ? 'text-white' : textStyles} font-semibold
                    text-base`}
                        value={date.toLocaleDateString('vi-VN', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        })}
                        placeholder={placeholder}
                        placeholderTextColor={'#7b7b8b'}
                        editable={false}
                    />
                </View>
            </View>
        </Pressable>
    );
};

export default CustomDateTimePicker;
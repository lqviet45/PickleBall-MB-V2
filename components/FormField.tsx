import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from "react-native";
import icons from "@/constants/icons";

interface FormFieldProps {
    title: string;
    value: string;
    placeholder?: string;
    handleChangeText: (e: string) => void;
    otherStyles?: string;
    keyBoardType?: string;
    isEditable?: boolean;
    isPassword?: boolean;
}

const FormField = ({title, value, placeholder, handleChangeText, otherStyles, keyBoardType, isEditable, isPassword} : FormFieldProps) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-gray-100 font-pmedium">
                {title}
            </Text>
            <View className="border-2 border-black-200
            w-full h-16 px-4 bg-black-100
            rounded-2xl focus:border-secondary items-center flex-row">
                <TextInput
                    className="flex-1 text-white font-semibold
                    text-base"
                    value={value}
                    editable={isEditable ?? true}
                    placeholder={placeholder}
                    placeholderTextColor={'#7b7b8b'}
                    onChangeText={handleChangeText}
                    secureTextEntry={isPassword && !showPassword }
                />

                {
                    isPassword && (
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Image
                                source={!showPassword ? icons.eye : icons.eyeHide}
                                className="w-6 h-6"
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                    )
                }
            </View>
        </View>
    );
};

export default FormField;
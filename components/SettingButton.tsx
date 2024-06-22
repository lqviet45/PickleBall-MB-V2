import React from 'react';
import {TouchableOpacity, View, Text} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {color} from "ansi-fragments";
import {IconProps} from "@expo/vector-icons/build/createIconSet";

interface SettingButtonProps {
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
    size: number;
    color: string;
    HandlePress: () => void;
}

const SettingButton = ({title, icon, size, color, HandlePress} : SettingButtonProps, index: number) => {
    return (
        <TouchableOpacity key={index} className={"justify-center pt-2"}
                            onPress={HandlePress}
        >
            <View className="flex-row items-center px-2 gap-5">
                <Ionicons name={icon} size={size} color={color} />
                <Text className={"font-medium text-lg"}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default SettingButton;
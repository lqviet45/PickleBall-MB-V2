import React from 'react';
import {Text, TouchableOpacity} from "react-native";
import {AddDotToNumber} from "@/lib/helper";

interface QuickAmountInputProps {
    amount: number;
    onPressFunc: any;
}
const QuickAmountInput = ({amount, onPressFunc} : QuickAmountInputProps) => {
    return (
        <TouchableOpacity
            className={"border-amber-400 border-2 p-2 w-[30%] mb-2"}
            onPress={() => onPressFunc(amount)}>
            <Text className={"text-amber-400"}>{AddDotToNumber(amount)}</Text>
        </TouchableOpacity>
    );
};

export default QuickAmountInput;
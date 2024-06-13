import {View, Text, StyleSheet} from "react-native";
import {Dropdown} from "react-native-element-dropdown";

interface CustomDropdownProps {
    label: string;
    data: any;
    labelField: string;
    valueField: string;
    onChange: (value: any) => void;
    value?: any;
    isFocus?: boolean;
    isSearchable?: boolean;
}

const CustomDropdown = (
    {
        label,
        data,
        labelField,
        valueField,
        onChange,
        value,
        isFocus,
        isSearchable
    }: CustomDropdownProps) => {

    const renderLabel = () => {
        return (
            <Text className='text-base text-gray-100 font-pmedium'>
                {label}
            </Text>
        );
    };
    return (
        <View className="bg-Base p-2">
            {renderLabel()}
            <View className="border-2 border-black-200
            w-fit h-16 px-4 bg-black-100
            rounded-2xl">
                <Dropdown
                    data={data}
                    labelField={labelField}
                    valueField={valueField}
                    onChange={onChange}
                    style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    value={value}
                    search={isSearchable}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    dropdown: {
        height: 60,
        width: 330,
        borderColor: 'gray'
    },
    icon: {
        marginRight: 5
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        zIndex: 999,
        paddingHorizontal: 8,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
        color: 'gray'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

export default CustomDropdown;
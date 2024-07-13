import {View, Text, StyleSheet} from "react-native";
import {Dropdown} from "react-native-element-dropdown";

interface CustomDropdownProps {
    label?: string;
    data: any;
    labelField: string;
    valueField: string;
    onChange: (value: any) => void;
    onBlur?: () => void;
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
        onBlur,
        value,
        isFocus,
        isSearchable
    }: CustomDropdownProps) => {

    const renderLabel = () => {
        return (
            <Text className='font-pmedium text-lg text-black'>
                {label}
            </Text>
        );
    };
    return (
        <View className="p-2">
            {renderLabel()}
            <Dropdown
                data={data}
                labelField={labelField}
                valueField={valueField}
                onChange={onChange}
                onBlur={onBlur}
                style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                value={value}
                search={isSearchable}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    dropdown: {
        height: 30,
        width: 150,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
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
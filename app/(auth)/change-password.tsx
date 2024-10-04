import {View, Text, ScrollView, Alert} from "react-native";
import FormField from "@/components/FormField";
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";
import CustomButton from "@/components/CustomButton";


const ChangePassword = () => {
    const [form, setForm] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const formFields = [
        {
            title: 'Old Password',
            value: form.oldPassword,
            handleChangeText: (e: string) => setForm({...form, oldPassword: e}),
            otherStyles: 'mt-10',
            keyBoardType: 'password',
            isPassword: true
        },
        {
            title: 'New Password',
            value: form.newPassword,
            handleChangeText: (e: string) => setForm({...form, newPassword: e}),
            otherStyles: 'mt-10',
            keyBoardType: 'password',
            isPassword: true
        },
        {
            title: 'Confirm Password',
            value: form.confirmPassword,
            handleChangeText: (e: string) => setForm({...form, confirmPassword: e}),
            otherStyles: 'mt-10',
            keyBoardType: 'password',
            isPassword: true
        }
    ];

    const submit = () => {
        setIsLoading(true);
        if (form.oldPassword === '' || form.newPassword === '' || form.confirmPassword === '') {
            Alert.alert('Error', 'Please fill all fields');
            setIsLoading(false);
            return;
        }

        if (form.newPassword !== form.confirmPassword) {
            Alert.alert('Error', 'Password does not match');
            setIsLoading(false);
            return;
        }

        auth().currentUser?.updatePassword(form.newPassword).then(() => {
            console.log('Password updated!');
        }).catch((error) => {
            console.log(error);
        });
        setIsLoading(false);
    }

    return (
        <SafeAreaView className="bg-base h-full">
            <ScrollView>
                <View className="w-full justify-center min-h-[85vh] px-4 my-6">
                    <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
                        Change Password
                    </Text>
                    {
                        formFields.map((field, index) => (
                            <FormField
                                key={index}
                                title={field.title}
                                value={field.value}
                                handleChangeText={field.handleChangeText}
                                otherStyles={field.otherStyles}
                                keyBoardType={field.keyBoardType}
                                isPassword={field.isPassword}
                            />
                        ))
                    }

                    <CustomButton
                        title='Change Password'
                        handlePress={submit}
                        containerStyles='mt-10'
                        textStyles={" text-primary font-psemibold text-lg"}
                        isLoading={isLoading}
                    />

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ChangePassword;
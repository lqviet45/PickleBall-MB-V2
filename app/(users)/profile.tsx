import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomDateTimePicker from "@/components/CustomDateTimePicker";
import CustomButton from "@/components/CustomButton";


const Profile = () => {

    const [userInform, setUserInform] = useState({
        name: '',
        email: '',
        dateOfBirth: new Date(),
        location: '',
        phoneNumber: '',
    });

    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        //getUserInform();

    }, []);

    const onChangeDate = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || userInform.dateOfBirth;
        setUserInform({...userInform, dateOfBirth: currentDate});
    };
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
        },
        {
            title: 'Phone Number',
            value: userInform.phoneNumber,
            handleChangeText: (e: string) => setUserInform({...userInform, phoneNumber: e}),
            otherStyles: 'mt-10',
            KeyboardType: 'phone-pad'
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
                            isEditable={isEdit}
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
                        display={'spinner'}
                    />

                    <FormField
                        title={"Location"}
                        value={userInform.location}
                        otherStyles={"mt-10"}
                        isEditable={isEdit}
                        handleChangeText={e => setUserInform({...userInform, location: e})}
                    />

                    <CustomButton
                        title={isEdit ? "Save" : "Edit"}
                        containerStyles={"w-full mt-10"}
                        handlePress={() => {
                            setIsEdit(!isEdit)
                            if (isEdit) {
                                //saveUserInform();
                            }
                        }}

                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;
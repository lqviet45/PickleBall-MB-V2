import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomDateTimePicker from "@/components/CustomDateTimePicker";
import CustomButton from "@/components/CustomButton";
import {date, object, string} from "yup";
import {Formik} from "formik";
import {axiosInstance} from "@/lib/axios";
import {useGlobalContext} from "@/context/GlobalProvider";
import {UserProfileInform} from "@/model/user";

let userSchema = object({
    name: string().required(),
    email: string().required().email(),
    dateOfBirth: date().required(),
    location: string().required(),
    phoneNumber: string().nullable()
});

const Profile = () => {

    const [userInform, setUserInform] = useState<UserProfileInform>({
        fullName: '',
        email: '',
        dateOfBirth: new Date(),
        location: '',
        phoneNumber: '',
    });
    const {userLogin} = useGlobalContext();

    const [isEdit, setIsEdit] = useState(false);

    useLayoutEffect(() => {
        console.log(userLogin?.uid);
        //getUserInform();
        getUserInform().catch(e => console.log(e));
    }, []);

    const getUserInform = async () => {
        const data = await axiosInstance.post(
            'users/firebase-id',
            {
                firebaseId: userLogin?.uid
            }
        );
        if (!data.data.value.dateOfBirth) {
            data.data.value.dateOfBirth = new Date();
        }
        setUserInform(data.data.value);
    }


    const submit = () => {
        //saveUserInform();
    }

    return (
        <SafeAreaView className="bg-Base h-full">
            <ScrollView>
                <View className="w-full min-h-[85vh] px-4 my-4">
                    <View className="items-center">
                        <Text className="text-2xl text-yellow-100 text-semibold mt-10 font-psemibold">
                            Profile
                        </Text>
                    </View>

                    <Formik
                        initialValues={userInform}
                        onSubmit={submit}
                        validationSchema={userSchema}
                        enableReinitialize={true}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values,
                          setFieldValue }) => (
                            <View>
                                <FormField
                                    title="Full Name"
                                    value={values.fullName}
                                    handleChangeText={handleChange('fullName')}
                                    otherStyles="mt-10"
                                    keyBoardType="default"
                                    isEditable={isEdit}
                                />

                                <FormField
                                    title="Email"
                                    value={values.email}
                                    handleChangeText={handleChange('email')}
                                    otherStyles="mt-10"
                                    keyBoardType="default"
                                    isEditable={isEdit}
                                />

                                <FormField
                                    title="Phone Number"
                                    value={values.phoneNumber}
                                    handleChangeText={handleChange('phoneNumber')}
                                    otherStyles="mt-10"
                                    keyBoardType="default"
                                    isEditable={isEdit}
                                />

                                <CustomDateTimePicker
                                    userInform={values}
                                    setFieldValue={setFieldValue}
                                    //onChangeDate={onChangeDate}
                                    title={"Date of Birth"}
                                    otherStyles={"mt-10"}
                                    isEdit={isEdit}
                                    placeholder={"dd/mm/yyyy"}
                                    currentMode={'date'}
                                    display={'spinner'}
                                />

                                <FormField
                                    title={"Location"}
                                    value={values.location}
                                    otherStyles={"mt-10"}
                                    isEditable={isEdit}
                                    handleChangeText={handleChange('location')}
                                />

                                <CustomButton
                                    title={isEdit ? "Save" : "Edit"}
                                    containerStyles={"w-full mt-10"}
                                    handlePress={isEdit ? handleSubmit : () => setIsEdit(true)}
                                />
                            </View>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;
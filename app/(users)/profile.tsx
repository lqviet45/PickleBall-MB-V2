import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomDateTimePicker from "@/components/CustomDateTimePicker";
import CustomButton from "@/components/CustomButton";
import {date, object, string} from "yup";
import {Formik} from "formik";
import {axiosInstance} from "@/lib/axios";
import {useGlobalContext} from "@/context/GlobalProvider";
import {UserProfileInform} from "@/model/user";
import * as ImagePicker from 'expo-image-picker';
import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";

let userSchema = object({
    name: string().required(),
    email: string().required().email(),
    dateOfBirth: date().required(),
    location: string().required(),
    phoneNumber: string().nullable()
});

const Profile = () => {

    const filePath = 'users/';
    const [userInform, setUserInform] = useState<UserProfileInform>({
        firstName: '',
        lastName: '',
        email: '',
        dayOfBirth: new Date(),
        location: '',
        phoneNumber: '',
    });
    const {userLogin, setUser} = useGlobalContext();
    const [image, setImage] = useState(userLogin?.photoURL);
    const [isEdit, setIsEdit] = useState(false);
    const imgUploadName = useRef('');

    useEffect(() => {
        setImage(userLogin?.photoURL);
        getUserInform().catch(e => console.log(e));
    }, []);

    const getUserInform = async () => {
        const data = await axiosInstance.post(
            'users/firebase-id',
            {
                firebaseId: userLogin?.uid
            }
        );
        if (!data.data.value.dayOfBirth) {
            data.data.value.dayOfBirth = new Date();
        }
        data.data.value.dayOfBirth = new Date(data.data.value.dayOfBirth);
        setUserInform(data.data.value);
    }

    const handleChangeImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            imgUploadName.current = filePath + `${userInform.email}-${new Date()}.jpg`;
            const imgRef = storage().ref(imgUploadName.current);
            await imgRef.putFile(result.assets[0].uri);
            setImage(result.assets[0].uri);
        }

        if (result.assets !== null && result.assets[0].uri) {
            const imgUrl = await storage().ref(imgUploadName.current).getDownloadURL();

            if (userLogin !== null) {
                await userLogin?.updateProfile({
                    photoURL: imgUrl
                })
                const user = auth().currentUser;
                setUser(user!);
            }
        }
    }

    const submit = async (values: any) => {
        console.log(userInform);
        const data = await axiosInstance.put('/users/update-user', values);
        setIsEdit(false);
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

                    <View>
                        <TouchableOpacity
                            onPress={handleChangeImage}
                        >
                            <Image
                                source={{uri: image ?? 'https://www.w3schools.com/howto/img_avatar.png'}}
                                className="w-32 h-32 rounded-full mt-10 mx-auto"
                                resizeMode={'cover'}
                            />
                        </TouchableOpacity>
                    </View>

                    <Formik
                        initialValues={userInform}
                        onSubmit={submit}
                        //validationSchema={userSchema}
                        enableReinitialize={true}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values,
                          setFieldValue }) => (
                            <View>
                                <FormField
                                    title="First Name"
                                    value={values.firstName}
                                    handleChangeText={handleChange('firstName')}
                                    otherStyles="mt-10"
                                    keyBoardType="default"
                                    isEditable={isEdit}
                                />

                                <FormField
                                    title="last Name"
                                    value={values.lastName}
                                    handleChangeText={handleChange('lastName')}
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
                                    isEditable={false}
                                />

                                {/*<FormField*/}
                                {/*    title="Phone Number"*/}
                                {/*    value={values.phoneNumber}*/}
                                {/*    handleChangeText={handleChange('phoneNumber')}*/}
                                {/*    otherStyles="mt-10"*/}
                                {/*    keyBoardType="default"*/}
                                {/*    isEditable={isEdit}*/}
                                {/*/>*/}

                                <CustomDateTimePicker
                                    date={values.dayOfBirth}
                                    setFieldValue={setFieldValue}
                                    fieldValueName={"dayOfBirth"}
                                    title={"Date of Birth"}
                                    otherStyles={"mt-10"}
                                    isEdit={isEdit}
                                    placeholder={"dd/mm/yyyy"}
                                    currentMode={'date'}
                                    display={'spinner'}
                                    inputStyles={'bg-black-100 border-2 border-black-100'}
                                    textStyles={'text-white'}
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
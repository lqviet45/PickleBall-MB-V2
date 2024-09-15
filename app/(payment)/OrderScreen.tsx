import React, {useEffect, useState} from 'react';
import {useGlobalContext} from "@/context/GlobalProvider";
import {Alert, StyleSheet} from "react-native";
import {Text} from "react-native-paper"
import * as Linking from "expo-linking";
import {createPaymentLink} from "@/lib/paymentApi";
import {SafeAreaView} from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";

const OrderScreen = () => {
    const {userId} = useGlobalContext();
    const [name, setName] = useState("Mì tôm Hảo Hảo ly");
    const [cast, setCast] = useState("1000");
    const [content, setContent] = useState("Thanh toan don hang");
    const [errorName, setErrorName] = useState(false);
    const [errorCast, setErrorCast] = useState(false);
    const [errorContent, setErrorContent] = useState(false);
    //Uri trả về từ  PayOs và mở nó trong Web View
    //Quản lý trạng thái nút bấm và gọi Api
    const [pressedButton1, setPressedButton1] = useState(undefined);

    useEffect(() => {
        if (userId === undefined || userId === null) return;
        if (pressedButton1 === undefined) return;
        if (!name.length) setErrorName(true);
        if (!cast.length) setErrorCast(true);
        if (!content.length) setErrorContent(true);
        if (!name.length || !cast.length || !content.length) {
            setPressedButton1(undefined);
            return;
        }
        (async () => {
            try {
                let res = await createPaymentLink({
                    userId: userId,
                    name: name,
                    price: parseInt(cast),
                    description: content,
                    returnUrl: "pickle-ball:///(payment)/ResultScreen",
                    cancelUrl: "pickle-ball:///(payment)/ResultScreen",
                });

                if (res.error !== undefined)
                    throw new Error("Không thể kết nối đến server");


                Linking.canOpenURL(res.checkoutUrl).then(supported => {
                    if (supported) {
                        Linking.openURL(res.checkoutUrl);
                    } else {
                        console.log("Don't know how to open URI: " + res.data.checkoutUrl);
                    }
                });

                setPressedButton1(undefined);
            } catch (error: any) {
                Alert.alert(error);
                setPressedButton1(undefined);
            }
        })();
    }, [pressedButton1]);

    return (
        <>
            <SafeAreaView style={styles.container}>
                <Text variant="headlineMedium" style={styles.headerText}>
                    Tạo mới đơn hàng
                </Text>

                <FormField
                    title={"Tên sản phẩm"}
                    value={name}
                    handleChangeText={setName}
                />

                <FormField
                    title={"Giá tiền"}
                    value={cast}
                    handleChangeText={setCast}
                />

                <FormField
                    title={"Nội dung"}
                    value={content}
                    handleChangeText={setContent}

                />

                <CustomButton
                    title={"Thanh toán"}
                    handlePress={() => setPressedButton1((prevState) => !prevState as any)}
                />
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "90%",
        alignSelf: "center",
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000000",
    },
    button: {
        marginVertical: 20,
        width: "80%",
        alignSelf: "center",
        borderRadius: 10,
    },
});

export default OrderScreen;
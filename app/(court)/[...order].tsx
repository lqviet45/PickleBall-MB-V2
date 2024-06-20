import {View, Text} from "react-native";
import {useLocalSearchParams} from "expo-router";

const OrderPage = () => {
    const {id, name, price} = useLocalSearchParams<{
        id: string;
        name: string;
        price: string;
    }>();

    console.log(id, name, price);

    return (
        <View>
            <Text>Order Page</Text>
            <Text>{id}</Text>
            <Text>{name}</Text>
            <Text>{price}</Text>
        </View>
    );
};

export default OrderPage;
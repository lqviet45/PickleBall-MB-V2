import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";


const CourtLayout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen
                    name="[id]"
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="[...order]"

                    options={{headerShown: false}}
                />
            </Stack>
            <StatusBar backgroundColor={'#08222F'} style="light"/>
        </>
    );
};

export default CourtLayout;
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
            </Stack>
            <StatusBar style="auto"/>
        </>
    );
};

export default CourtLayout;
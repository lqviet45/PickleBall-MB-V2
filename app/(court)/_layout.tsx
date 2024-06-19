import {Stack} from "expo-router";


const CourtLayout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen
                    name="[id]"
                    options={{headerShown: false}}
                />
            </Stack>
        </>
    );
};

export default CourtLayout;
import React, {useState} from 'react';
import {router, useLocalSearchParams} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView} from "react-native";
import {Booking} from "@/model/booking";
import {CourtGroup} from "@/model/courtGroup";

const BookingDetail = () => {
    let {id} = useLocalSearchParams<{id: string}>();
    let [booking, setBooking] = useState<Booking>({
        id: '',
        courtYardId: '',
        courtGroupId: '',
        userId: '',
        dateId: '',
        numberOfPlayers: 0,
        bookingStatus: 1,
        createdOnUtc: new Date(),
        modifiedOnUtc: new Date(),
        courtGroup: {
            id: '',
            userId: '',
            wardId: '',
            wallerId: '',
            name: '',
            price: 0,
            minSlot: 0,
            maxSlot: 0,
            wardName: '',
            createdOnUtc: new Date(),
            modifiedOnUtc: new Date()
        }
    });


    return (
        <SafeAreaView>
            <ScrollView className={"h-full"}>

            </ScrollView>
        </SafeAreaView>
    );
};

    export default BookingDetail;
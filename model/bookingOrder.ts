import {CourtGroup} from "@/model/courtGroup";

export interface BookingOrder {
    id: string;
    courtYardId: string;
    courtGroupId: string;
    userId: string;
    dateId: string;
    numberOfPlayers: number;
    timeRange: string;
    bookingStatus: string;
    createOnUtc: Date;
    courtYard: any;
    courtGroup: CourtGroup;
    date: {
        dateWorking: string;
    };
}
import {CourtGroup} from "@/model/courtGroup";

export interface Booking {
    id: string;
    courtYardId: string;
    courtGroupId: string;
    userId: string;
    dateId: string;
    numberOfPlayers: number;
    bookingStatus: number;
    createdOnUtc: Date;
    modifiedOnUtc: Date;
    courtGroup: CourtGroup;
}
export interface BookingOrder {
    id: string;
    courtYardId: string;
    courtGroupId: string;
    userId: string;
    dateId: string;
    numberOfPlayers: number;
    bookingStatus: string;
    createOnUtc: string;
    date: any;
    courtGroup: any;
}
export interface CourtGroup {
    id: string;
    userId: string;
    wardId: string;
    wallerId: string;
    name: string;
    price: number;
    minSlot: number;
    maxSlot: number;
    createdOnUtc: Date;
    modifiedOnUtc: Date;
}
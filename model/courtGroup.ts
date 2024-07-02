export interface CourtGroup {
    id: string;
    userId: string;
    wardId: string;
    name: string;
    price: number;
    minSlot: number;
    maxSlot: number;
    location: string;
    owner: string;
    medias?: [
        {
            id: string;
            mediaUrl: string;
            createOnUtc: string;
            modifiedOnUtc: string;
        }
    ];
}
export interface CourtGroup {
    id: string;
    name: string;
    price: number;
    minSlot: number;
    maxSlot: number;
    location: string;
    owner: string;
    medias: string[];
}
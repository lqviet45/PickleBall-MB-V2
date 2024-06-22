import {string} from "yup";

export type User = {
    email: string;
    password: string;
    fullName: string;
    firstName?: string;
    lastName?: string;
    location?: string;
}

export interface UserProfileInform {
    fullName: string;
    email: string;
    dateOfBirth: Date;
    location: string;
    phoneNumber: string;
}
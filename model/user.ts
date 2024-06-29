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
    firstName: string;
    lastName: string;
    email: string;
    dayOfBirth: Date;
    location: string;
    phoneNumber: string;
}
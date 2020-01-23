import { DateTime, DateTimeFormatOptions } from 'luxon';

export class Reservation {
    id: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    numberOfPeople: string;
    date: Date;
    time: DateTimeFormatOptions;
    specialRequest: string;
}
import { DateTime} from 'luxon';

export class Reservation {
    id: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    numberOfPeople: string;
    date: Date;
    time: DateTime;
    specialRequest: string;
    confirmed: boolean;
}

export interface BookingsResponse {
    createdBy: string;
    createdDate: string;
    lastModifiedDate: Date;
    lastModifiedBy: string;
    id: number;
    fullName: string;
    email: string;
    numberOfPeople: number;
    date: Date;
    time: Date;
    specialRequest: string;
    confirmed: boolean;
  }
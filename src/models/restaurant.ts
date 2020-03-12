import {OpeningHours} from './openingHours';
import { Reservation } from './reservation';
import { User } from './user';
export class Restaurant {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
    user: User;
    openingHours: [OpeningHours];
    reservation: [Reservation];
}
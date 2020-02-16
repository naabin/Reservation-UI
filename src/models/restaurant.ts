import {OpeningHours} from './openingHours';
import { Reservation } from './reservation';
export class Restaurant {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
    openingHours: [OpeningHours];
    reservation: [Reservation];
}
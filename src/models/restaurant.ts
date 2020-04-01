import {OpeningHours} from './openingHours';
import { Reservation } from './reservation';
import { User } from './user';
import {ImageResponse} from './image';
export class Restaurant {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
    siteAddress: string;
    email: string;
    about: string;
    user: User;
    openingHours: [OpeningHours];
    reservation: [Reservation];
    image: ImageResponse;
}

export class PublicRestaurant {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
    about: string;
    siteAddress: string;
    openingHours: [OpeningHours];
    image: ImageResponse;
}
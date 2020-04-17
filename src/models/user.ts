import { UserRole } from './userRole';

export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    jwtToken: string;
    restaurantId: string;
    userRoles: UserRole[];
}
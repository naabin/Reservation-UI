import { UserRole } from './userRole';

export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    jwtToken: string;
    restaurantId: string;
    userRoles: UserRole[];
}
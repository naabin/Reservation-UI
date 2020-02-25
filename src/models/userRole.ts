export class UserRole {
    id: number
    role: Role
}

export class Role {
    
    id: number
    role: string

    constructor(role: string){
        this.role = role;
    }
}

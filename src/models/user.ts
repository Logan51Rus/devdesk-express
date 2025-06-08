export enum Roles {
    user = 'user',
    admin = 'admin',
}

export interface IUser {
    email: string,
    password: string,
    name: string,
    role: Roles
}
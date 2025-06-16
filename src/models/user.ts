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

export interface UserUpdateData {
    email?: string,
    name?: string
}
import { Request } from 'express';
import { User } from './users.interface';

export interface StoredData {
    id: number;
}

export interface TokenData {
    token: string;
    expiresIn: number;
}

export interface RequestWithUser extends Request {
    user: User;
}
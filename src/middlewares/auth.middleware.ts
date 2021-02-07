import { NextFunction, Response } from 'express';
import { StoredData } from './../interfaces/auth.interface';
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException';
import { StoredData, RequestWithUser } from '../interfaces/auth.interface';
import { UserEntity } from '../entity/users.entity';

const authMiddleware = async(req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const {cookies} = req;
        
        if (cookies && cookies.Authorization) {
            const secret = process.env.JWT_SECRET;
            const verificationResponse = (await jwt.verify(cookies.Authorization, secret)) as StoredData;
            const userId = verificationResponse.id;
        
            const userRepository = getRepository(UserEntity);
            const findUser = await userRepository.findOne(userId, { select: ['id', 'email', 'password'] });
            
            if (findUser) {
                req.user = findUser;
                next();
            } else {
                next(new HttpException(401, 'Invalid authentication token'));
            }
        } else {
            next(new HttpException(404, 'Authentication token missing'));
        }
    } catch(err) {
        next(new HttpException(401, 'Invalid authentication token'));
    }
};

export default authMiddleware;
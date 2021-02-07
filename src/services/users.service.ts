import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import HttpException from '../exceptions/HttpException';
import { User } from '../interfaces/users.interface';
import { UserEntity } from '../entity/users.entity';
import { isEmpty } from '../utils/util';
import { CreateUserDTO } from '../dtos/users.dto';

class UserService {
    
    public users = UserEntity;

    public findUserById = async (userId: number): Promise<User> => {
        const userRepository = getRepository(this.users);
        const findUser: User = await userRepository.findOne({ where: { id: userId } });
        if (!findUser) throw new HttpException(409, 'Not a user???');
        return findUser;
    }

    public createUser = async (userData: CreateUserDTO): Promise<User> => {
        if (isEmpty(userData)) throw new HttpException(400, 'User data is empty');
        
        const userRepository = getRepository(this.users);
        const findUser: User = await userRepository.findOne({ where: { email: userData.email } });
        if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);
        
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const createUserData: User = await userRepository.save({ ...userData, password: hashedPassword });
        return createUserData;
    }
}

export default UserService;
import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import { CreateUserDTO } from '../dtos/users.dto';
import Route from '../interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../middlewares/validation.middleware';

class UsersRoute implements Route {
    public path = '/users';
    public router = Router();
    public usersController = new UsersController();
  
    constructor() {
        this.initializeRoutes();
    }
  
    private initializeRoutes() {
        this.router.get(`${this.path}`, authMiddleware, this.usersController.getUsers);
        this.router.get(`${this.path}/:id(\\d+)`, this.usersController.getUserById);
        this.router.post(`${this.path}`, validationMiddleware(CreateUserDTO, 'body'), this.usersController.createUser);
        this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateUserDTO, 'body', true), this.usersController.updateUser);
        this.router.delete(`${this.path}/:id(\\d+)`, this.usersController.deleteUser);
    }
}
  
export default UsersRoute;
  
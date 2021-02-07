import { Router } from 'express';
import IndexController from '../controllers/index.controller';
import Route from '../interfaces/routes.interface';

class IndexRoute implements Route {

    public path = '/'
    public router = Router();
    public IndexController = new IndexController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes = () => {
        this.router.get(`${this.path}`, this.IndexController.index);
    }
}

export default IndexRoute;
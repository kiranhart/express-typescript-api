import 'dotenv/config';
import App from './app';
import IndexRoute from './routes/index.route';
import AuthRoute from './routes/auth.route';
import UsersRoute from './routes/users.route';

const app = new App([
    new IndexRoute(),
    new AuthRoute(),
    new UsersRoute()
]);

app.listen();
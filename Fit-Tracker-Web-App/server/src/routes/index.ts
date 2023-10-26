import { Router } from 'express';
import hello from './web/hello';
import auth from './web/auth';
import user from './web/user';


// guaranteed to get dependencies
export default () => {
	const app = Router();

	hello(app);
 	auth(app);
	user(app);

	return app
}
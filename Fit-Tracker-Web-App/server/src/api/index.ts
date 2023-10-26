import { Router } from 'express';
import health from "./routes/health"
import auth from './routes/auth';
import admin from './routes/admin';
import user from './routes/user';
import workouts from './routes/workouts';

// guaranteed to get dependencies
export default () => {
	const app = Router();


	health(app);
	auth(app);
	admin(app);
	user(app);
	workouts(app);

	return app
}
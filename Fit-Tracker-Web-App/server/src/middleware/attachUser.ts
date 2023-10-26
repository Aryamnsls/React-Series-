import User from '../models/User';
import {  Request, Response, NextFunction } from 'express';


/**
 * retrieves the user from the database (excluding password/salt) based on the req.token id.
 * If no valid user was returned we will respond with 401.
 * When a user is found we attach the user as currentUser into the request.
 *
 * @param req the request coming through
 * @param res the response to send back
 * @param next call next middleware
 */
const attachCurrentUser = async (req: Request, res: Response,next: NextFunction) => {

    try {

      const userRecord = await User.findById(req.token._id);

      if (!userRecord) {
        return res.sendStatus(401);
      }

      const currentUser = userRecord.toObject();

      Reflect.deleteProperty(currentUser, 'password');
      Reflect.deleteProperty(currentUser, 'salt');

      req.currentUser = currentUser;

      return next();

    } catch (e) {
      // Logger.error('🔥 Error attaching user to req: %o', e);
      return next(e);
    }
  };

  export default attachCurrentUser;
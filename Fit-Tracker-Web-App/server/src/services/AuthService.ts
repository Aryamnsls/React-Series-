import {IUser,IUserInputDTO} from '../interfaces/IUser';
import User from '../models/User'
import argon2 from 'argon2';
import config from '../config';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';

export default class AuthService{



    public async SingUp(userInputDTO: IUserInputDTO):Promise<{user:IUser; token: string }>{

      try{
        // TODO: hash password properly
        const salt = randomBytes(32);
        const hashedPassword = await argon2.hash(userInputDTO.password,{salt});

        const userRecord = await new User({
            ...userInputDTO,
            password:hashedPassword,
            salt: salt.toString('hex'),
        }).save();

        const token = this.generateToken(userRecord);


        if (!userRecord) {
            throw new Error('User cannot be created');
          }

          // await this.mailer.SendWelcomeEmail(userRecord);

          // this.eventDispatcher.dispatch(events.user.signUp, { user: userRecord });

          const user = userRecord.toObject();
          Reflect.deleteProperty(user, 'password');
          Reflect.deleteProperty(user, 'salt');
          return { user,token };

        } catch (e) {

          throw e;
        }
    }

    public async SignIn(email: string, password: string): Promise<{user:IUser; token: string }> {
        const userRecord = await User.findOne({ email });
        if (!userRecord) {
          throw new Error('User not registered');
        }
        /**
         * We use verify from argon2 to prevent 'timing based' attacks
         */

        const validPassword = await argon2.verify(userRecord.password, password);
        if (validPassword) {
          const token = this.generateToken(userRecord);

          const user = userRecord.toObject();
          Reflect.deleteProperty(user, 'password');
          Reflect.deleteProperty(user, 'salt');

          return { user,token };
        } else {
          throw new Error('Invalid Password');
        }
      }


      private generateToken(user:any) {
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 60);

        /**
         * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
         * The cool thing is that you can add custom properties a.k.a metadata
         * Here we are adding the userId, role and name
         * Beware that the metadata is public and can be decoded without _the secret_
         * but the client cannot craft a JWT to fake a userId
         * because it doesn't have _the secret_ to sign it
         * more information here: https://softwareontheroad.com/you-dont-need-passport
         */

        return jwt.sign(
          {
            _id: user._id, // We are gonna use this in the middleware 'isAuth'
            role: user.role,
            name: user.name,
            exp: exp.getTime() / 1000,
          },
          config.jwtSecret
        );
      }

}
import mongoose from 'mongoose';
import { Db } from 'mongodb';
import config from '../config';

export default async (): Promise<Db> => {
  const connection = await mongoose.connect(config.database.url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  // TODO: doesnt look right
  return connection.connection.getClient().db();
};
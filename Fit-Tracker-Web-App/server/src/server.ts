import app from "./loaders/app";
import config from './config';

async function startServer(){

   await require('./loaders').default();

   const PORT = config.port;

   app.listen(PORT, () => {
      // tslint:disable-next-line:no-console
      console.log('Express server listening on port ' + PORT);
   });

}

startServer();

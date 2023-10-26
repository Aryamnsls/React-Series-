import express from "express"
import path from "path";
import cors from "cors";
import * as bodyParser from "body-parser";
import cookieparser from "cookie-parser"
import web_routes from '../routes';
import api_routes from '../api';
import config from '../config/index'

class App {

   public app: express.Application;

   constructor() {
      this.app = express();
      this.config();

      this.loadRoutes();
   }

   private loadRoutes():void{
      this.app.use(web_routes());
      this.app.use(config.api.prefix,api_routes());
   }

   private config(): void {

      // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
      // It shows the real origin IP in the heroku or Cloudwatch logs
      this.app.enable('trust proxy');


      // Configure Express to use EJS
      this.app.set( "views", path.join( __dirname, "../views" ) );
      this.app.set( "view engine", "ejs" );


      this.app.use(cookieparser());
      // The magic package that prevents frontend developers going nuts
      // Alternate description:
      // Enable Cross Origin Resource Sharing to all origins by default
      this.app.use(cors())
      // support application/json type post data
      this.app.use(bodyParser.json());
      // support application/x-www-form-urlencoded post data
      this.app.use(bodyParser.urlencoded({ extended: false }));






   }
}
export default new App().app;
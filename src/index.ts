import express, { Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import "reflect-metadata";
import * as swagger from 'swagger-express-ts';
import { SwaggerDefinitionConstant } from 'swagger-express-ts';
import { appAPI } from './routes/apiroutes';
import { secretUtil } from './utils/secretutil';

/**
 * @description Express server application class.
 */
class App {
  public server = express();

  constructor() {
    this.initMiddlewares();
    this.defineRoutes();
  }

  private initMiddlewares(): void {
    this.server.use(appAPI.appPath, appAPI.routerinstance);
    this.server.use('/api-docs/swagger', express.static('swagger'));
    this.server.use('/api-docs/swagger/assets', express.static('node_modules/swagger-ui-dist'));
    this.server.use(bodyParser.json());
    this.server.use(swagger.express({
      definition: {
        info: {
          title: "Get Virtual-Machine UniqueID",
          version: "1.0",
        },
        securityDefinitions: {
          apiKeyHeader: {
            type: SwaggerDefinitionConstant.Security.Type.API_KEY,
            in: SwaggerDefinitionConstant.Security.In.HEADER,
            name: "Authorization"
          }
        }
      }
    }));
  }

  private defineRoutes(): void {

    // API Base path
    this.server.use(bodyParser.urlencoded({ extended: false }));
    this.server.use(bodyParser.json());
    this.server.use(appAPI.path, appAPI.routerinstance);

    // fallback invalid route
    this.server.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).json({
        success: false,
        message: 'Invalid route',
        result: {},
        statusCode: 404
      });
    });
  }

}

// initialize server app
const app = new App();

// export the default "App" class object "server" property
export default app;
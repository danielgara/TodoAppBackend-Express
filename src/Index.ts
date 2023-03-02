import dotenv from "dotenv";
import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-Parser";
import TodoController from './controllers/TodoController';
import DBConfig from './db/DBConfig';

class Index {
  public static app: Express;

  public static async main(){
    dotenv.config();
    Index.app = express();
    Index.app.use(cors({origin: '*'}));
    Index.app.use(bodyParser.urlencoded({ extended: true }));
    Index.app.use(bodyParser.json());
    await Index.startDB();
    Index.configRoutes();
    Index.startServer();
  }

  public static async startDB(){
    try {
      await DBConfig.main();
      await DBConfig.sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  public static configRoutes(){
    Index.app.post('/todos', TodoController.create);
    Index.app.get('/todos/open', TodoController.listOpen);
    Index.app.get('/todos/closed', TodoController.listClosed);
    Index.app.get('/todos/delete/:id', TodoController.delete);
    Index.app.get('/todos/update/:id/:state', TodoController.update);
  } 

  public static startServer(){
    const PORT = process.env.NODE_PORT || 3001;
    Index.app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  } 
}

Index.main();
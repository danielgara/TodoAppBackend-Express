import { Sequelize } from 'sequelize';
import Todo from '../models/Todo';

export default class DBConfig {
  public static sequelize:Sequelize;

  public static async main(){
    DBConfig.sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: 'src/db/database.sqlite'
    });
    DBConfig.initializeModels();
    await DBConfig.syncDB();
  }

  public static async initializeModels(){
    Todo.initialize(DBConfig.sequelize);
  }

  public static async syncDB(){
    await DBConfig.sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
  }
}
  
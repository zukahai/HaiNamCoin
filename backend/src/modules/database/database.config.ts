const models = [];
export const CONFIG_DATABASE = {
  development: {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'nest',
    models: models,
    authorization: true,
  },
  production: {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'nest',
    models: models,
    authorization: true,
  },
};

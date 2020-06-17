//Imports
const Sequelize = require('sequelize');
//Defining connection
const sequelize = new Sequelize('project_musicbase', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
        timezone: 'Etc/GMT0'
    },
    logging: false
});
//Connection test
sequelize
  .authenticate()
  .then(() => {
    console.log('\x1b[36m[DATABASE]\x1b[0m Connection has been established successfully');
  })
  .catch(err => {
    console.error('\x1b[36m[DATABASE]\x1b[0m Unable to connect to the database:', err);
  });
//Defining models
const User = sequelize.define('user', {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
//Synchronizing with DB
sequelize.sync()
//Exports
module.exports = {
    sequelize,
    User
}
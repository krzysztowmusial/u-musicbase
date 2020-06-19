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
const Op = Sequelize.Op;
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
const Album = sequelize.define('album', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    },
    genre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cover: {
        type: Sequelize.STRING,
        allowNull: false
    },
});
const Fav = sequelize.define('fav', {
    user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: User,
          key: 'id'
        }
    },
    album_id: {
        type: Sequelize.INTEGER,
        references: {
          model: Album,
          key: 'id'
        }
    }
});
//Synchronizing with DB
sequelize.sync()
//Filling DB with data
Album.create({
    name: 'Dark Side of The Moon',
    author: 'Pink Floyd',
    genre: 'Rock',
    date: '1973-03-01',
    cover: 'https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png'
});
Album.create({
    name: 'Exercises in Futility',
    author: 'Mgła',
    genre: 'Metal',
    date: '2015-09-04',
    cover: 'https://upload.wikimedia.org/wikipedia/en/0/0b/Mgla_-_Exercises_in_Futility_cover_art.jpg'
});
Album.create({
    name: 'Sunbather',
    author: 'Deafheaven',
    genre: 'Metal',
    date: '2013-04-11',
    cover: 'https://upload.wikimedia.org/wikipedia/en/7/74/Deafheaven_-_Sunbather_2013.png'
});
//Exports
module.exports = {
    Op,
    sequelize,
    User,
    Album,
    Fav
}
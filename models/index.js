const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  storage: 'db.sqlite'
});


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


  const Records = sequelize.define('records', {
      title: Sequelize.TEXT,
      amount: Sequelize.INTEGER,
      category: Sequelize.TEXT,
      date: Sequelize.DATE,
      comment: Sequelize.TEXT
  })

  const Categories = sequelize.define('categories', {
      name: Sequelize.TEXT
  })

  sequelize.sync().then(e => {
    console.log('Synced db!')
  })
  .catch(err => {
    console.log('Did not sync db!', err)
  })
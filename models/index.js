const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  operatorsAliases: false,
  logging: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  storage: 'db.sqlite'
});

  const Record = sequelize.define('record', {
      title: Sequelize.TEXT,
      amount: Sequelize.INTEGER,
      date: Sequelize.DATE,
      comment: Sequelize.TEXT
  })

  const Category = sequelize.define('category', {
      name: {
        type: Sequelize.TEXT,
        primaryKey: true
      }
  })

  Record.belongsTo(Category)

  sequelize.sync().then(e => {
    console.log('Synced db!')
  })
  .catch(err => {
    console.log('Did not sync db!', err)
  })
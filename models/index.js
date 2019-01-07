const Sequelize = require('sequelize');
const operatorsAliases = require('./aliases')
const sequelize = new Sequelize({
 database: 'pay-manager',
 username: 'root',
 password: 'root',
 dialect: 'mysql',
 host: 'localhost',
 logging: false,
 port: 3306,
 operatorsAliases,
 pool: {
     max: 100,
     min: 0,
     idle: 20000,
     acquire: 20000
 }
});


const Category = sequelize.define('category', {
 name: {
  type: Sequelize.STRING,
  unique: true
 }
})

const Record = sequelize.define('record', {
 title: Sequelize.TEXT,
 amount: Sequelize.INTEGER,
 date: Sequelize.DATE,
 comment: Sequelize.TEXT
})

Record.belongsTo(Category)

sequelize.sync().then(e => {
  console.log('Synced db!')
 })
 .catch(err => {
  console.log('Did not sync db!', err)
 })

module.exports = {
 Category,
 Record
}
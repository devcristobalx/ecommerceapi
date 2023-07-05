const sequelize = require('../utils/connection');
const user = require('./createData/user');
require("../models")

const main = async() => {
    try{
        await sequelize.sync({ force: true });
        await sequelize.close()
        console.log('Database reset successful 🥲☠️');
    } catch(error){
        console.log(error);
    }
 }

module.exports = main
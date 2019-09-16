//dbconfig 경로
const path=require('path')
//db 환경변수설정
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname,'..','database','db_config.json'))[env]

//db 연결
const Sequelize = require("sequelize")
const db = {}
const sequelize = new Sequelize(config.database,config.username,config.password,{
    host: config.host,
    dialect: 'mysql',
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
   
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
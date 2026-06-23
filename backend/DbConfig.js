const mysql=require('mysql2')
require('dotenv').config();

const db=mysql.createConnection({
host:process.env.DB_HOST,
user:process.env.DB_USER,
database:process.env.DB_DATABASE,
password:process.env.DB_PASSWORD
})

db.connect((err) => {
  if (err) {
    console.log("DB Error ", err);
  } else {
    console.log("MySQL Connected ");
  }
});
module.exports=db
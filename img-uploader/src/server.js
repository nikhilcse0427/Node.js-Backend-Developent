import dotenv from 'dotenv'
dotenv.config({
  path: './.env'
})
import app from './app.js'
import connectDb from './config/db.js';

const port = process.env.PORT || 4000;

connectDb()
.then(()=>{
  app.listen(port, ()=>{
    console.log(`Mongodb connectes successfully on ${port}`);
  })
})
.catch((error)=>{
  console.log(`Mongodb not conneted: `, error.message);
})
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

mongoose.connect(`${process.env.DB}`, { useNewUrlParser: true })
  .then((): void => { console.log('Connected to the Database')})
  .catch((error) => console.error(error));


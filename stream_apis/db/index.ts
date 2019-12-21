import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
dotenv.config();

mongoose.connect(`${process.env.DB}`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((): void => { console.log('Connected to the Database'); })
  .catch((error) => console.error(error));

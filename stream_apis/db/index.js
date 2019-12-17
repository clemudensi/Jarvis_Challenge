const mongoose = require('mongoose');

mongoose.connect(process.env.DB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

// "DB": "mongodb+srv://fundit_admin:FunditNG@fundit-a7j8p.mongodb.net/fund_it?retryWrites=true&w=majority",

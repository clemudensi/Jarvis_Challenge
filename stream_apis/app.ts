import * as express from 'express';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import router from './routes';
const app = express();
const port = process.env.PORT || 8000;

const corsOption = {
    origin: true,
    methods: 'HEAD, GET, POST, PUT, PATCH, DELETE',
    credentials: true
};

app.use(compression());
app.use(cors(corsOption));
app.use(bodyParser.json());

app.use('/api', router);
app.listen(port, ()=> {
    console.log(`listening on port ${port}`)
});

// module.exports = router;

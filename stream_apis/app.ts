import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';
import './db';
import router from './lib/routes';

const app = express();
const port = process.env.PORT || 8000;

const corsOption = {
    credentials: true,
    methods: 'DELETE, GET, HEAD, PATCH, POST, PUT',
    origin: true,
};

app.use(compression());
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router);
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

export default app;

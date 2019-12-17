import * as express from 'express';
const router = express.Router();

router.get('/', (req: any, res: any): any => {
    res.send('I have been connected to the source')
});

export default router;

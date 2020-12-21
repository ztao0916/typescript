import 'reflect-metadata';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import errorHandle from './middleware/errorHandle';
import router from './router';
import config from './config';

const app = new Koa()
    .use(bodyParser())
    .use(errorHandle())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(config.port, () => {
    console.info(`Server running on port ${config.port}`);
});
import express from 'express';
import routes from './routes';
import { PORT } from './config'
import { errorHandler } from './middlewares';
const app = express();


app.use(express.json())
app.use('/api', routes);
app.use(errorHandler);
const port = PORT || 3300;
app.listen(port, () => {
    console.log(`server is running pn port no ${port} 🚀🚀🚀`);
})
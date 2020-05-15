import 'reflect-metadata';
import './database/index.database';
import express from 'express';
import routes from './routes/index.routes';

const app = express();
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
    console.log('✅ Server started on port 3333');
});

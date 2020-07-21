import 'reflect-metadata';
import './database/index.database';
import express from 'express';
import routes from './routes/index.routes';
import uploadConfig from './config/upload';

const app = express();
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(3333, () => {
    console.log('✅ Server started on port 3333');
});

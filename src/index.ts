import express from 'express';
import productRoutes from './routes/productRoutes';
import { json } from 'body-parser';




const app = express();

app.use(json());
app.use('/api', productRoutes);

app.listen(5500, () => {
    console.log('Server is running on port' );
});

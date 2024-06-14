import express from 'express';
import {
    addProduct,
    searchProduct,
    getPaginatedProducts,
    filterProducts
} from '../controllers/productController';

const router = express.Router();

router.post('/products', addProduct);
router.get('/products/search', searchProduct);
router.get('/products', getPaginatedProducts);
router.get('/products/filter', filterProducts);

export default router;

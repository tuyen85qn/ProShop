import express from 'express';
import {getProducts, getById} from '../controllers/productControllers.js';
const router = express.Router();


router.route('/').get(getProducts);

router.route('/:id').get(getById);

export default router
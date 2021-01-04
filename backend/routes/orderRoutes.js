import express from 'express';
import {protect} from '../middlewares/authMiddleware.js'
import {addOrderItems, getOrderDetail, updateOrderToPaid} from '../controllers/orderControllers.js';
const router = express.Router();


router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderDetail);
router.route('/:id/pay').post(protect, updateOrderToPaid);
export default router
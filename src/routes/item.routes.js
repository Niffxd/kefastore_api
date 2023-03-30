import { Router } from 'express';
import * as itemRoutes from '../controllers/item.controller.js';

const router = Router();

router.get('/items', itemRoutes.getItems);
router.post('/items', itemRoutes.createItem);
router.put('/items/:id', itemRoutes.putItem);
router.delete('/items/:id', itemRoutes.deleteItem);
router.get('/items/:id', itemRoutes.getItems);

export default router;

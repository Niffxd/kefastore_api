import { Router } from 'express';
import * as userRoutes from '../controllers/user.controller.js';

const router = Router();

router.get('/users', userRoutes.getUsers);
router.post('/users', userRoutes.createUser);
router.put('/users/:id', userRoutes.putUser);
router.delete('/users/:id', userRoutes.deleteUser);
router.get('/users/:id', userRoutes.getUsers);
router.get('/users/:id/items', userRoutes.getItems);

export default router;

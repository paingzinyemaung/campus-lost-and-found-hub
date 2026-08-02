import { Router } from 'express';
import {
  createItem,
  deleteItem,
  getItemById,
  getItems,
  updateItem,
} from './item.controller.js';
import { protect } from '../../middleware/auth.middleware.js';
import { upload } from '../../middleware/upload.middleware.js';

const noteRoute = Router();

noteRoute.get('/', getItems);
noteRoute.get('/:id', getItemById);

noteRoute.use(protect);

// upload.single('image') ကို protect နောက်မှ ထည့်ပေးပါ
noteRoute.post('/', upload.single('image'), createItem);

noteRoute.put('/:id', updateItem);
noteRoute.delete('/:id', deleteItem);

export default noteRoute;

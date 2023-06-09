import express from 'express';
import { checkUserName } from '../controllers/userControllers';
const router = express.Router();

router.route('/username').get(checkUserName)

export default router;
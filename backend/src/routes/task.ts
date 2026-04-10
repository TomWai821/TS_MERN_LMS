import express from 'express';
import { AWSTaskDetect } from '../controller/AWSTaskController'

const router = express.Router();

router.post('/', AWSTaskDetect);

export default router
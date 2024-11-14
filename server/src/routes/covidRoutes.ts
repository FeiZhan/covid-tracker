import express from 'express';
import { getCovidData } from '../controllers/covidController';

const router = express.Router();

// Route to fetch COVID data with optional filters
router.get('/covid', getCovidData);

export default router;

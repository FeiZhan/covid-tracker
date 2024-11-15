import express from 'express';
import { getCovidData, initializeCovidController } from '../controllers/covidController';

const router = express.Router();

// Middleware to ensure data is loaded into memory
let isDataLoaded = false;

const ensureDataLoaded = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!isDataLoaded) {
    try {
      await initializeCovidController();
      isDataLoaded = true;
      next(); // Continue to the next middleware or route handler
    } catch (error) {
      console.error('Failed to load COVID data:', error);
      res.status(500).json({ message: 'Failed to load COVID data. Please try again later.' });
    }
  } else {
    next(); // Data is already loaded; proceed to the next middleware or route handler
  }
};

// Route to fetch COVID data with optional filters
router.get('/covid', ensureDataLoaded, getCovidData);

export default router;

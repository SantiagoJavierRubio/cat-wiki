import express from "express";
import { mostVisited, visitBreed } from '../controllers/visitCount.js';

// For /log requests
const router = express.Router();

router.get('/most_visited', mostVisited);

router.post('/visit', visitBreed);

export default router;
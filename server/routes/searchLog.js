import express from "express";
import { mostVisited, visitBreed } from '../controllers/visitCount.js';

const router = express.Router();

router.get('/most_visited', mostVisited);

router.post('/visit', visitBreed);

export default router;
import express from "express";
import { getBreedList, getBreedInfo } from "../controllers/breeds.js";

const router = express.Router();

router.get('/breeds', getBreedList);

router.get('/breed_info', getBreedInfo);

export default router;
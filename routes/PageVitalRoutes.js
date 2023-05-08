import express, { json } from "express";
import {
  generatePageVitalData,
  generateLocalLightHouse
} from "../controllers/PageVital.js";

const router = express.Router();

router.route("/generateData").get(generatePageVitalData)
router.route("/generateLocalLighHouse").get(generateLocalLightHouse)

export default router;

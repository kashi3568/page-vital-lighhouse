import express, { json } from "express";
import {
  getAllUrls,
  createUrl,
  getUrlById,
  updateUrl,
  deleteUrl,
} from "../controllers/UrlController.js";

const router = express.Router();

router.route("/").get(getAllUrls).post(createUrl);
router.route("/:id").get(getUrlById).put(updateUrl).delete(deleteUrl);
router.route('/asdfasdfasdf').get((req, res) => { res.json({ a: 'asdfds'}) })
export default router;

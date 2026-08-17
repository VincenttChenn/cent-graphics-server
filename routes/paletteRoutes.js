import express from "express";
import {
  getPalettes,
  createPalette,
  savePalette,
  removePalette,
} from "../controllers/paletteController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getPalettes);
router.post("/", auth, createPalette);
router.post("/:id/save", auth, savePalette);
router.delete("/:id/save", auth, removePalette);

export default router;

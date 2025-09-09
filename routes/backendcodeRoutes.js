import express from "express";
import {
    createCode,
    getCodes,
    getCodeById,
    updateCode,
    deleteCode
} from "../controllers/backendcodeController.js";

const router = express.Router();

router.post("/", createCode);
router.get("/", getCodes);
router.get("/:id", getCodeById);
router.put("/:id", updateCode);
router.delete("/:id", deleteCode);

export default router;

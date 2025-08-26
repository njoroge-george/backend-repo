import { Router } from "express";
import {
    getGrades,
    createGrade,
    updateGrade,
    deleteGrade,
    exportGradesCSV
} from "../controllers/gradeController.js";

const router = Router();

router.get("/", getGrades);
router.post("/", createGrade);
router.put("/:id", updateGrade);
router.delete("/:id", deleteGrade);
router.get("/export", exportGradesCSV);

export default router;
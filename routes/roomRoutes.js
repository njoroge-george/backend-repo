import express from "express";
import { createRoom, getRooms, deleteRoom } from "../controllers/roomController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, authorize("admin"), createRoom);
router.get("/", authenticate, authorize("admin"), getRooms);
router.delete("/:id", authenticate, authorize("admin"), deleteRoom);

export default router;

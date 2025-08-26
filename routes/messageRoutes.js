import express from "express";
import {
    getMessages,
    createMessage,
    replyToMessage,
    markMessageRead,
    deleteMessage
} from "../controllers/messageController.js";

const router = express.Router();

router.get("/", getMessages); // GET all messages (admin)
router.post("/", createMessage); // CREATE a new message (visitor)
router.post("/reply/:id", replyToMessage); // REPLY to a message (admin)
router.patch("/:id/read", markMessageRead); // PATCH: Mark a message as read/unread (admin)
router.delete("/:id", deleteMessage); // DELETE a message (admin)

export default router;
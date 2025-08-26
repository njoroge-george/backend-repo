import express from "express";
import { sendEmail, getEmails, getEmailById, replyToEmail } from "../controllers/emailController.js";

const router = express.Router();

router.post("/", sendEmail);        // send new email
router.get("/", getEmails);         // fetch all emails
router.get("/:id", getEmailById);   // fetch single email
router.put("/:id/reply", replyToEmail); // reply to email

export default router;

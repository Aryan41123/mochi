import express from "express";
import { handleClerkWebhook } from "../controller/webhookController.js";

const router = express.Router();

router.post("/", handleClerkWebhook);

export default router;
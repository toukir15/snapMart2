import express from "express";
import { FollowController } from "./follow.controller";

const router = express.Router();

router.post("/", FollowController.createFollow);

export const FollowRoutes = router;

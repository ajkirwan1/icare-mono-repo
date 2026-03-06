import express, { Router } from "express";
import {
  getPublicProfile,
  updateProfile,
  uploadPhoto,
  uploadIntroVideo,
  removeIntroVideo
} from "./caregiver-profile.controller.js";

const router = Router();

router.get("/caregiver-profiles/:id/public", getPublicProfile);
router.put("/caregiver-profiles/:id", updateProfile);
router.put(
  "/caregiver-profiles/:id/photo",
  express.raw({ type: ["image/jpeg", "image/jpg", "image/png", "image/webp"], limit: "5mb" }),
  uploadPhoto
);
router.put(
  "/caregiver-profiles/:id/intro-video",
  express.raw({ type: ["video/mp4", "video/webm", "video/quicktime"], limit: "40mb" }),
  uploadIntroVideo
);
router.delete("/caregiver-profiles/:id/intro-video", removeIntroVideo);

export default router;

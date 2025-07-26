import express from "express";
import {
  getProjects,
  createProject,
  getProject,
  updateProject,
} from "../controllers/projectController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

router.get("/", getProjects);
router.post("/", createProject);
router.get("/:id", getProject);
router.put("/:id", updateProject);

export default router;

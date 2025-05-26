import express from "express";
import {
  createNotes,
  getNotes,
  updateNotes,
  deleteNotes,
} from "../controller/NotesController.js";
import {
  Register,
  Login,
  refreshToken,
  logout,
} from "../controller/UsersController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// User Routes
router.post("/register", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", logout);

// Notes Routes
router.get("/notes", verifyToken, getNotes);
router.get("/notes/:id", verifyToken, getNotes);
router.post("/add-note", verifyToken, createNotes);
router.put("/update-note/:id", verifyToken, updateNotes);
router.delete("/delete-note/:id", verifyToken, deleteNotes);

router.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default router;


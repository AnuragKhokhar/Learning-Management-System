import { Router } from "express";
import { register, login, logout, getProfile, forgotPassword, resetPassword, changePassoword, updateUser } from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.post('/register', upload.single("avatar"), register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', isLoggedIn, getProfile);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:resetToken", resetPassword);
router.post("/change-password", isLoggedIn ,changePassoword);
router.put("/update", isLoggedIn, upload.single("avatar") ,updateUser);

export default router;
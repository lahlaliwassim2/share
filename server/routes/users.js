import express  from "express";
import {
    getUser,
    getUserFrinds,
    addRemoveFrind
} from '../controllers/users.js'
import { verifyToken } from "../middlewares/auth.js";


const router = express.Router()

// READ
router.get("/:id",verifyToken, getUser)
router.get("/:id/frinds", verifyToken, getUserFrinds)

// UPDATE 
router.patch("/:id/:frindId", verifyToken, addRemoveFrind)

export default router
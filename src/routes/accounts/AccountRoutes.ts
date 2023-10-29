import express from "express";
import * as AccountController from "../../controllers/AccountController";

const router = express.Router();

router.post("/add_account", AccountController.addAccount);
router.get("/get_account/:id", AccountController.getAccount);
router.get("/getTopAccounts/", AccountController.getTopAccounts);

export default router;

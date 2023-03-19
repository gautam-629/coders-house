import express from 'express';
let router=express.Router();
import AuthController from '../Controller/AuthController'
import authMiddleware from '../middlewares/authMiddleware';
import ActivateController from '../Controller/activateController';
router.post('/send-otp',AuthController.sendOtp);
router.post('/verify-otp',AuthController.verifyOtp);
router.post('/activate',authMiddleware,ActivateController.activate);
router.get('/refresh',AuthController.refresh);
router.post('/logout',authMiddleware,AuthController.logout);
export default router;
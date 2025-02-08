
import {Router} from 'express';
import {
    register,
    login,
    logout,
    updateuserDetails,
    updateAvatar,
    updatePassword,
    forgetPassword,
    getCurrentuser,
    refreshAceesToken,
} from '../controllers/balak.controller.js';

const router=Router();

router.post('/register',register);
router.post('/login',login);
router.post('/logout',logout);
router.put('/updateuserDetails',updateuserDetails);
router.put('/updateAvatar',updateAvatar);
router.put('/updatePassword',updatePassword);
router.put('/forgetPassword',forgetPassword);
router.get('/getCurrentuser',getCurrentuser);
router.get('/refreshAceesToken',refreshAceesToken);

export default router;
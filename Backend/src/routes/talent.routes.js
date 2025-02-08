import {Router} from 'express';
import {addTalent, updateTalent, deleteTalent, getUserTalents, getTalentById } from "../controllers/talent.controller.js"; 

const router = Router();


router.route('/').get(getUserTalents).post(addTalent);
router.route('/:id').put(updateTalent).delete(deleteTalent).get(getTalentById);

export default router;